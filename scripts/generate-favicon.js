/**
 * Generates favicon.svg that keeps the natural logo ratio.
 * Run: node scripts/generate-favicon.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const logoPath = path.join(root, "public", "Logo.png");
const outPath = path.join(root, "public", "favicon.svg");

if (!fs.existsSync(logoPath)) {
  console.error("public/Logo.png not found.");
  process.exit(1);
}

const logoBase64 = fs.readFileSync(logoPath).toString("base64");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <image
    href="data:image/png;base64,${logoBase64}"
    x="50%"
    y="50%"
    width="100%"
    height="100%"
    transform="translate(-50,-50)"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>
`;

fs.writeFileSync(outPath, svg.trim());

console.log("✔ favicon.svg generated with natural ratio");
