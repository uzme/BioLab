import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const DRIVE_REMOTE = process.env.BIOLAB_DRIVE_REMOTE ?? "manus_google_drive:Biotexnologiya";
const RCLONE_CONFIG = process.env.BIOLAB_RCLONE_CONFIG ?? "/home/ubuntu/.gdrive-rclone.ini";
const OUTPUT_PATH = process.env.BIOLAB_AUDIT_OUTPUT
  ?? "/home/ubuntu/biolab-guide/docs/reports/hero-drive-asset-audit.json";
const WORK_ROOT = process.env.BIOLAB_AUDIT_WORK_ROOT ?? "/tmp/biolab-hero-drive-audit";

function run(command, args) {
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function batchNumber(name) {
  return Number(name.match(/batch_(\d+)\.zip$/)?.[1] ?? Number.MAX_SAFE_INTEGER);
}

function readWebpSize(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("RIFF/WebP imzosi topilmadi");
  }

  for (let offset = 12; offset + 8 <= buffer.length;) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkLength = buffer.readUInt32LE(offset + 4);
    const contentOffset = offset + 8;

    if (chunkType === "VP8X" && contentOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUIntLE(contentOffset + 4, 3) + 1,
        height: buffer.readUIntLE(contentOffset + 7, 3) + 1,
      };
    }
    if (chunkType === "VP8 " && contentOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(contentOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(contentOffset + 8) & 0x3fff,
      };
    }
    if (chunkType === "VP8L" && contentOffset + 5 <= buffer.length) {
      const bits = buffer.readUInt32LE(contentOffset + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    offset = contentOffset + chunkLength + (chunkLength % 2);
  }
  throw new Error("WebP o‘lcham chunki topilmadi");
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function downloadAndAudit(file) {
  const archivePath = join(WORK_ROOT, file.Name);
  const extractDir = join(WORK_ROOT, `extract-${batchNumber(file.Name)}`);
  rmSync(extractDir, { recursive: true, force: true });
  mkdirSync(extractDir, { recursive: true });

  run("rclone", ["copyto", `${DRIVE_REMOTE}/${file.Name}`, archivePath, "--config", RCLONE_CONFIG]);
  const integrityOutput = run("unzip", ["-t", archivePath]);
  const members = run("unzip", ["-Z1", archivePath]).trim().split("\n").filter(Boolean);
  run("unzip", ["-q", archivePath, "-d", extractDir]);

  const assets = members.map((member) => {
    const memberPath = join(extractDir, member);
    const isWebp = /^BIO-\d{3}\.webp$/i.test(basename(member));
    if (!isWebp || !existsSync(memberPath)) {
      return { member, validName: isWebp, dimensions: null, validDimensions: false };
    }
    const bytes = readFileSync(memberPath);
    const dimensions = readWebpSize(bytes);
    return {
      member,
      validName: true,
      dimensions,
      sha256: sha256(bytes),
      validDimensions: dimensions.width === 2560 && dimensions.height === 1440,
    };
  });

  const noUnexpectedFiles = members.every((member) => /^BIO-\d{3}\.webp$/i.test(basename(member)));
  const zipPass = integrityOutput.includes("No errors detected")
    && members.length > 0
    && noUnexpectedFiles
    && assets.every((asset) => asset.validName && asset.validDimensions);

  rmSync(extractDir, { recursive: true, force: true });
  rmSync(archivePath, { force: true });
  return {
    batch: batchNumber(file.Name),
    driveFileId: file.ID,
    name: file.Name,
    modifiedTime: file.ModTime,
    size: file.Size,
    sha256: file.Hashes?.sha256 ?? null,
    members,
    assets,
    noUnexpectedFiles,
    zipPass,
  };
}

mkdirSync(WORK_ROOT, { recursive: true });
const raw = run("rclone", ["lsjson", DRIVE_REMOTE, "--config", RCLONE_CONFIG, "--files-only", "--include", "*.zip", "--hash"]);
const driveFiles = JSON.parse(raw).filter((file) => /^BioLab_hero_assets_batch_\d+\.zip$/.test(file.Name));
const batches = driveFiles.sort((left, right) => batchNumber(left.Name) - batchNumber(right.Name));
const audit = batches.map(downloadAndAudit);
const assetIds = audit.flatMap((entry) => entry.assets.map((asset) => asset.member.replace(/\.webp$/i, "")));
const duplicateAssetIds = [...new Set(assetIds.filter((id, index) => assetIds.indexOf(id) !== index))].sort();
const assetOccurrences = Object.fromEntries(
  [...new Set(assetIds)].sort().map((id) => [
    id,
    audit.filter((entry) => entry.assets.some((asset) => asset.member === `${id}.webp`)).map((entry) => entry.batch),
  ]),
);
const missingAssetIds = Array.from({ length: 100 }, (_, index) => `BIO-${String(index + 1).padStart(3, "0")}`)
  .filter((id) => !assetIds.includes(id));
const missingBatchNumbers = Array.from({ length: 77 }, (_, index) => index + 1)
  .filter((expected) => !audit.some((entry) => entry.batch === expected));
const report = {
  generatedAt: new Date().toISOString(),
  driveRemote: DRIVE_REMOTE,
  readOnly: true,
  expectedBatchRange: "01–77",
  batchCount: audit.length,
  missingBatchNumbers,
  assetCount: assetIds.length,
  uniqueAssetCount: new Set(assetIds).size,
  missingAssetIds,
  duplicateAssetIds,
  assetOccurrences,
  allZipIntegrityPassed: audit.every((entry) => entry.zipPass),
  batches: audit,
};

mkdirSync(join(OUTPUT_PATH, ".."), { recursive: true });
writeFileSync(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`);
rmSync(WORK_ROOT, { recursive: true, force: true });
console.log(JSON.stringify({
  batchCount: report.batchCount,
  missingBatchNumbers: report.missingBatchNumbers,
  assetCount: report.assetCount,
  uniqueAssetCount: report.uniqueAssetCount,
  missingAssetIds: report.missingAssetIds,
  duplicateAssetIds: report.duplicateAssetIds,
  allZipIntegrityPassed: report.allZipIntegrityPassed,
  output: OUTPUT_PATH,
}, null, 2));
