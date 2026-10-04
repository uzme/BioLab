import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const staticAssetRoot = "/home/ubuntu/webdev-static-assets";
const registryPath = path.join(projectRoot, "client/src/lib/equipmentImages.ts");
const auditedUrlPath = path.join(projectRoot, "client/src/lib/auditedHeroImageUrls.ts");
const outputPath = path.join(projectRoot, "docs/reports/hero-asset-recovery-manifest.json");

const [registryText, auditedUrlText] = await Promise.all([
  readFile(registryPath, "utf8"),
  readFile(auditedUrlPath, "utf8"),
]);
const registry = new Map();
const entryPattern = /"(BIO-\d{3})":\s*\{\s*url:\s*"([^"]+)"[\s\S]*?alt:\s*"([^"]+)"/g;
const auditedUrlPattern = /"(BIO-\d{3})":\s*"(\/manus-storage\/biolab-equipment-\d{3}-hero_[^"]+\.webp)"/g;
const legacyAcceptedHeroIds = [
  "BIO-016", "BIO-017", "BIO-018", "BIO-019", "BIO-020", "BIO-021", "BIO-022",
  "BIO-024", "BIO-025", "BIO-027", "BIO-028", "BIO-029", "BIO-031", "BIO-033", "BIO-035",
];

for (const match of registryText.matchAll(entryPattern)) {
  registry.set(match[1], { url: match[2], alt: match[3] });
}

const auditedHeroIds = [];
for (const match of auditedUrlText.matchAll(auditedUrlPattern)) {
  const current = registry.get(match[1]);
  if (!current) {
    throw new Error(`${match[1]} uchun asosiy registry metadata topilmadi.`);
  }
  auditedHeroIds.push(match[1]);
  registry.set(match[1], { ...current, url: match[2] });
}

const acceptedHeroIds = new Set([...legacyAcceptedHeroIds, ...auditedHeroIds]);

const filenames = (await readdir(staticAssetRoot))
  .filter((filename) => {
    const id = `BIO-${filename.match(/biolab-equipment-(\d{3})-hero\.webp/)?.[1] ?? ""}`;
    return /^biolab-equipment-\d{3}-hero\.webp$/.test(filename) && acceptedHeroIds.has(id);
  })
  .sort();

const assets = await Promise.all(
  filenames.map(async (filename) => {
    const idMatch = filename.match(/biolab-equipment-(\d{3})-hero\.webp/);
    const id = `BIO-${idMatch[1]}`;
    const absolutePath = path.join(staticAssetRoot, filename);
    const [data, metadata] = await Promise.all([readFile(absolutePath), stat(absolutePath)]);
    const entry = registry.get(id);

    if (!entry?.url) {
      throw new Error(`${id} registry URL topilmadi; recovery manifest yaratish to‘xtatildi.`);
    }

    return {
      id,
      assetFilename: filename,
      assetUrl: entry.url,
      alt: entry.alt,
      bytes: metadata.size,
      sha256: createHash("sha256").update(data).digest("hex"),
      contentType: "image/webp",
    };
  }),
);

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose:
    "BioLab qabul qilingan hero-vizuallarini recovery uchun aniqlash; barcha fayl baytlari canonical Drive arxivida, runtime nusxalari project asset storage’da saqlanadi.",
  canonicalDriveRoot: {
    name: "Biotexnologiya",
    id: "19um8Y1EuuZbbTR2ncXDeg6mekc_xorhV",
  },
  recoveryArchive: {
    name: "BioLab_Hero_Assets_Recovery.tar.gz",
    contents: ["BATCHES/Batch-NNN__BIO-NNN__qurilma-nomi/BIO-NNN.webp", "BATCH_INDEX.md", "hero-asset-recovery-manifest.json"],
    organization: "Bitta batch = bitta qurilma; Batch 001 dan Batch 100 gacha uzluksiz tartib.",
    updatePolicy: "Mavjud Drive fayli o‘rnida yangilanadi; duplicate arxiv yaratilmaydi.",
  },
  acceptedHeroAssetCount: assets.length,
  blockedHeroIds: [],
  assets,
};

await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Recovery manifest yaratildi: ${outputPath}`);
console.log(`Qabul qilingan hero assetlar: ${assets.length}`);
