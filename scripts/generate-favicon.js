/**
 * Generates favicon.svg with the logo embedded (base64) so it keeps aspect ratio
 * and displays in all browsers. Run: node scripts/generate-favicon.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logoPath = path.join(root, "public", "Logo.png");
const outPath = path.join(root, "public", "favicon.svg");

if (!fs.existsSync(logoPath)) {
  console.error("public/Logo.png not found. Copy your navbar logo there first.");
  process.exit(1);
}

const logoBase64 = fs.readFileSync(logoPath).toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32" height="32">
  <image href="data:image/png;base64,${logoBase64}" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

fs.writeFileSync(outPath, svg);
console.log("Generated public/favicon.svg (logo at normal ratio, letterboxed).");
