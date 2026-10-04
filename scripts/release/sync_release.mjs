import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, lstatSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

const PROJECT_ROOT = resolve(process.cwd());
const CANONICAL_GITHUB_REPOSITORY = "uzme/BioLab";
const CANONICAL_DRIVE_ROOT_ID = "19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV"; // BioLab — Biotexnologiya root folder ID
const DRIVE_SNAPSHOT_NAME = "BioLab_Interactive_Guide_source.tar.gz";
const RCLONE_DRIVE_DESTINATION = `manus_google_drive:Biotexnologiya/${DRIVE_SNAPSHOT_NAME}`;
const RCLONE_CONFIG_PATH = "/home/ubuntu/.gdrive-rclone.ini";
const GITHUB_PROJECT_PATH = ".";
const mode = process.argv[2];

const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  ".manus-logs",
  ".next",
  ".sync",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "__pycache__",
]);
const EXCLUDED_SUFFIXES = [".log", ".pyc", ".zip", ".tar.gz"];
const EXCLUDED_FILES = new Set([
  ".project-config.json",
]);
const SECRET_PATTERNS = [
  ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["github-token", /\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{30,})\b/],
  ["openai-token", /\bsk-[A-Za-z0-9_-]{24,}\b/],
  ["google-api-key", /\bAIza[0-9A-Za-z_-]{20,}\b/],
  ["aws-access-key", /\bAKIA[0-9A-Z]{16}\b/],
  ["jwt", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/],
];

function run(command, args, cwd = PROJECT_ROOT, inherit = false) {
  const output = execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
  });
  return String(output ?? "").trim();
}

function isExcluded(relativePath) {
  const parts = relativePath.split("/").filter(Boolean);
  if (parts.some((part) => EXCLUDED_DIRECTORIES.has(part))) return true;
  if (EXCLUDED_FILES.has(relativePath)) return true;
  const filename = parts.at(-1) ?? "";
  if (filename.startsWith(".env") && filename !== ".env.example") return true;
  return EXCLUDED_SUFFIXES.some((suffix) => filename.endsWith(suffix));
}

function listSourceFiles(root, prefix = "") {
  const files = [];
  for (const entry of readdirSync(join(root, prefix), { withFileTypes: true })) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (isExcluded(relativePath)) continue;
    const absolutePath = join(root, relativePath);
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(root, relativePath));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      files.push({ absolutePath, relativePath });
    }
  }
  return files;
}

function scanForSecrets(files) {
  const findings = [];
  for (const { absolutePath, relativePath } of files) {
    const fileStat = lstatSync(absolutePath);
    if (!fileStat.isFile() || fileStat.size > 1_500_000) continue;
    const contents = readFileSync(absolutePath);
    if (contents.includes(0)) continue;
    const text = contents.toString("utf8");
    for (const [label, pattern] of SECRET_PATTERNS) {
      if (pattern.test(text)) findings.push(`${relativePath} (${label})`);
    }
  }
  if (findings.length > 0) {
    throw new Error(`Sanitizatsiya to‘xtatildi: ehtimoliy maxfiy ma’lumot topildi: ${findings.join(", ")}`);
  }
}

function fingerprint(files) {
  const digest = createHash("sha256");
  for (const item of [...files].sort((left, right) => left.relativePath.localeCompare(right.relativePath))) {
    const fileStat = lstatSync(item.absolutePath);
    digest.update(`${item.relativePath}\0${fileStat.mode & 0o777}\0`);
    if (fileStat.isSymbolicLink()) digest.update(`LINK\0${readFileSync(item.absolutePath, "utf8")}\0`);
    else digest.update(readFileSync(item.absolutePath));
  }
  return digest.digest("hex");
}

function createSanitizedArchive() {
  const files = listSourceFiles(PROJECT_ROOT);
  scanForSecrets(files);
  const sourceFingerprint = fingerprint(files);
  const temporaryDirectory = mkdtempSync(join(tmpdir(), "biolab-release-"));
  const stagedSource = join(temporaryDirectory, "biolab-guide");
  cpSync(PROJECT_ROOT, stagedSource, {
    recursive: true,
    filter: (source) => {
      const relativePath = relative(PROJECT_ROOT, source).split("\\").join("/");
      return relativePath === "" || !isExcluded(relativePath);
    },
  });
  const snapshotPath = join(temporaryDirectory, DRIVE_SNAPSHOT_NAME);
  run("tar", ["-czf", snapshotPath, "-C", temporaryDirectory, "biolab-guide"]);
  if (!existsSync(snapshotPath) || statSync(snapshotPath).size <= 0) {
    rmSync(temporaryDirectory, { recursive: true, force: true });
    throw new Error("Sanitizatsiyalangan snapshot mavjud emas yoki 0 bayt.");
  }
  return { temporaryDirectory, snapshotPath, sourceFingerprint };
}

function driveFilesByName() {
  const query = `'${CANONICAL_DRIVE_ROOT_ID}' in parents and name = '${DRIVE_SNAPSHOT_NAME}' and trashed = false`;
  const raw = run("gws", [
    "drive", "files", "list", "--params",
    JSON.stringify({ q: query, pageSize: 20, fields: "files(id,name,parents,size,modifiedTime,trashed)" }),
  ], PROJECT_ROOT);
  return JSON.parse(raw).files ?? [];
}

function verifyDriveFile(fileId) {
  const raw = run("gws", [
    "drive", "files", "get", "--params",
    JSON.stringify({ fileId, fields: "id,name,size,parents,trashed,md5Checksum,modifiedTime" }),
  ], PROJECT_ROOT);
  const metadata = JSON.parse(raw);
  const valid = metadata.name === DRIVE_SNAPSHOT_NAME
    && Number(metadata.size) > 0
    && Array.isArray(metadata.parents)
    && metadata.parents.includes(CANONICAL_DRIVE_ROOT_ID)
    && metadata.trashed === false;
  if (!valid) throw new Error("Drive post-upload tekshiruvi muvaffaqiyatsiz: nom, hajm, parent yoki trash holati noto‘g‘ri.");
  return metadata;
}

function uploadOrUpdateDrive(snapshotPath, sourceFingerprint) {
  const existing = driveFilesByName();
  let response;
  const description = `BioLab Interactive Guide sanitizatsiyalangan source snapshot; fingerprint=${sourceFingerprint}; maxfiy ma’lumotsiz.`;
  if (existing.length > 0) {
    const target = existing.sort((a, b) => String(b.modifiedTime).localeCompare(String(a.modifiedTime)))[0];
    response = run("gws", [
      "drive", "files", "update", "--params", JSON.stringify({ fileId: target.id }),
      "--upload", snapshotPath, "--upload-content-type", "application/gzip",
      "--json", JSON.stringify({ name: DRIVE_SNAPSHOT_NAME, description }), "--format", "json",
    ], dirname(snapshotPath));
  } else {
    response = run("gws", [
      "drive", "files", "create", "--upload", snapshotPath,
      "--upload-content-type", "application/gzip",
      "--json", JSON.stringify({
        name: DRIVE_SNAPSHOT_NAME,
        mimeType: "application/gzip",
        parents: [CANONICAL_DRIVE_ROOT_ID],
        description,
      }), "--format", "json",
    ], dirname(snapshotPath));
  }
  const fileId = JSON.parse(response).id ?? existing[0]?.id;
  if (!fileId) throw new Error("Drive javobida snapshot ID topilmadi.");
  return verifyDriveFile(fileId);
}

function uploadOrUpdateDriveWithFallback(snapshotPath, sourceFingerprint) {
  try {
    return { metadata: uploadOrUpdateDrive(snapshotPath, sourceFingerprint), transport: "gws" };
  } catch (primaryError) {
    const reason = primaryError instanceof Error ? primaryError.message : String(primaryError);
    console.warn(`[Drive] GWS upload bajarilmadi; rclone fallback ishlatiladi. Sabab: ${reason}`);
    run("rclone", [
      "copyto", snapshotPath, RCLONE_DRIVE_DESTINATION,
      "--config", RCLONE_CONFIG_PATH,
      "--checksum",
    ], PROJECT_ROOT, true);
    const raw = run("rclone", [
      "lsjson", RCLONE_DRIVE_DESTINATION,
      "--config", RCLONE_CONFIG_PATH,
    ]);
    const file = JSON.parse(raw)[0];
    const valid = file?.Name === DRIVE_SNAPSHOT_NAME
      && Number(file.Size) > 0
      && typeof file.ID === "string"
      && file.ID.length > 0;
    if (!valid) throw new Error("rclone fallback post-upload tekshiruvi: canonical snapshot metadata si noto‘g‘ri.");
    return {
      metadata: {
        id: file.ID,
        name: file.Name,
        size: file.Size,
        modifiedTime: file.ModTime,
        parents: [CANONICAL_DRIVE_ROOT_ID],
        trashed: false,
      },
      transport: "rclone-fallback",
    };
  }
}

function copyProjectToCanonicalRepository(destination) {
  cpSync(PROJECT_ROOT, destination, {
    recursive: true,
    filter: (source) => {
      const relativePath = relative(PROJECT_ROOT, source).split("\\").join("/");
      return relativePath === "" || !isExcluded(relativePath);
    },
  });
}

function publishToGitHub() {
  const temporaryDirectory = mkdtempSync(join(tmpdir(), "biolab-github-"));
  const repositoryPath = join(temporaryDirectory, "BioLab");
  try {
    run("gh", ["repo", "clone", CANONICAL_GITHUB_REPOSITORY, repositoryPath], PROJECT_ROOT, true);
    for (const entry of readdirSync(repositoryPath)) {
      if (entry !== ".git") rmSync(join(repositoryPath, entry), { recursive: true, force: true });
    }
    copyProjectToCanonicalRepository(repositoryPath);
    run("git", ["add", "--all", "--", "."], repositoryPath);
    const staged = run("git", ["diff", "--cached", "--name-only"], repositoryPath);
    if (staged) {
      run("git", ["commit", "-m", "chore: update BioLab guide verified source"], repositoryPath, true);
      run("git", ["push", "origin", "main"], repositoryPath, true);
    } else {
      run("git", ["push", "origin", "main"], repositoryPath, true);
    }
    return run("git", ["rev-parse", "HEAD"], repositoryPath);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

function runVerification() {
  console.log("[1/4] TypeScript check, production build va regressiya testlari...");
  run("pnpm", ["run", "check"], PROJECT_ROOT, true);
  run("pnpm", ["build"], PROJECT_ROOT, true);
  run("pnpm", ["test"], PROJECT_ROOT, true);
  run("node", ["scripts/release/verify_continuity_docs.mjs"], PROJECT_ROOT, true);
}

if (mode !== "--check" && mode !== "--publish") {
  console.error("Foydalanish: node scripts/release/sync_release.mjs --check | --publish");
  process.exit(1);
}

try {
  runVerification();
  console.log("[2/4] Sanitizatsiyalangan snapshot tayyorlanmoqda...");
  const archive = createSanitizedArchive();
  console.log(JSON.stringify({ fingerprint: archive.sourceFingerprint, snapshot: archive.snapshotPath }, null, 2));

  if (mode === "--check") {
    console.log("CHECK READY: GitHub va Drive upload bajarilmadi.");
    rmSync(archive.temporaryDirectory, { recursive: true, force: true });
    process.exit(0);
  }

  console.log("[3/4] Tekshirilgan BioLab kodi uzme/BioLab main branchiga yuborilmoqda...");
  const githubCommit = publishToGitHub();
  console.log(`[GitHub] ${githubCommit}`);

  console.log("[4/4] Snapshot Biotexnologiya BioLab Drive papkasiga yuklanmoqda yoki mavjud nusxa yangilanmoqda...");
  const { metadata: driveFile, transport: driveTransport } = uploadOrUpdateDriveWithFallback(archive.snapshotPath, archive.sourceFingerprint);
  console.log(JSON.stringify({
    githubRepository: `https://github.com/${CANONICAL_GITHUB_REPOSITORY}`,
    githubProjectPath: GITHUB_PROJECT_PATH,
    githubCommit,
    driveParentId: CANONICAL_DRIVE_ROOT_ID,
    driveFileId: driveFile.id,
    driveFileName: driveFile.name,
    driveModifiedTime: driveFile.modifiedTime,
    driveTransport,
  }, null, 2));
  rmSync(archive.temporaryDirectory, { recursive: true, force: true });
  console.log("PUBLISH COMPLETED: sanitizatsiyalangan BioLab snapshoti va tekshirilgan kod sinxronlandi.");
} catch (error) {
  console.error("Release sync xatosi:", error instanceof Error ? error.message : error);
  process.exit(1);
}
