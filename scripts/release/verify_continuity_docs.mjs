import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const CANONICAL_REPOSITORY = "uzme/BioLab";
const CANONICAL_DRIVE_ROOT_ID = "19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV";
const requiredDocs = [
  "README.md",
  "docs/master-protocols/PROJECT_MANIFEST.md",
  "docs/master-protocols/ARCHITECTURE.md",
  "docs/master-protocols/DATABASE.md",
  "docs/master-protocols/REPRODUCTION.md",
  "docs/master-protocols/AI_HANDOFF.md",
  "docs/master-protocols/CURRENT_STATE.md",
  "docs/master-protocols/PROJECT_INVENTORY.md",
  "docs/master-protocols/DECISIONS.md",
  "docs/master-protocols/CHANGELOG.md",
  "docs/master-protocols/TROUBLESHOOTING.md",
  "docs/master-protocols/SECRETS_REQUIRED.md",
  "docs/master-protocols/PROJECT_STATE.md",
  "docs/master-protocols/DRIVE_INDEX.md",
  "docs/master-protocols/GITHUB_INDEX.md",
  "docs/master-protocols/RESTORATION_MAP.md",
  "docs/master-protocols/CONTINUITY_AUDIT.md",
  "LICENSE",
  "CONTRIBUTING.md",
  "SECURITY.md",
];

const read = (file) => {
  const filePath = path.join(root, file);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
};

const missing = requiredDocs.filter((file) => !fs.existsSync(path.join(root, file)));
const stateDocuments = ["docs/master-protocols/PROJECT_STATE.md", "docs/master-protocols/CURRENT_STATE.md", "docs/master-protocols/CONTINUITY_AUDIT.md"];
const crossLinkChecks = {
  githubCanonicalRepo: read("README.md").includes(`github.com/${CANONICAL_REPOSITORY}`)
    && read("docs/master-protocols/GITHUB_INDEX.md").includes(`github.com/${CANONICAL_REPOSITORY}`),
  driveRootId: read("docs/master-protocols/DRIVE_INDEX.md").includes(CANONICAL_DRIVE_ROOT_ID),
  restorationHasGitHub: read("docs/master-protocols/RESTORATION_MAP.md").includes(`github.com/${CANONICAL_REPOSITORY}`),
  restorationHasDrive: read("docs/master-protocols/RESTORATION_MAP.md").includes(CANONICAL_DRIVE_ROOT_ID),
  stateHasReadyStatus: stateDocuments.every((file) => {
    const text = read(file);
    return /\bREADY\b/.test(text)
      && !text.includes("READY WITH EXCEPTION")
      && !text.includes("NOT READY")
      && !text.includes("NOT_READY");
  }),
};

const envExamplePresent = fs.existsSync(path.join(root, ".env.example"));
const environmentContractPresent = read("docs/master-protocols/SECRETS_REQUIRED.md").includes("No real secrets or production credentials are stored");
const allChecksPassed = missing.length === 0
  && environmentContractPresent
  && Object.values(crossLinkChecks).every(Boolean);
const result = {
  generatedAt: new Date().toISOString(),
  canonicalRepository: CANONICAL_REPOSITORY,
  canonicalDriveRootId: CANONICAL_DRIVE_ROOT_ID,
  requiredDocumentCount: requiredDocs.length,
  missingRequiredDocs: missing,
  envExamplePresent,
  environmentContractPresent,
  crossLinkChecks,
  status: allChecksPassed ? "READY" : "NOT_READY",
};
console.log(JSON.stringify(result, null, 2));
if (result.status === "NOT_READY") process.exitCode = 1;
