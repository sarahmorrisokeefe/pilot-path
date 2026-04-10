#!/usr/bin/env node
/**
 * PilotPath App Icon Generator
 *
 * Generates a 1024x1024 PNG app icon from assets/icon.svg.
 * The PNG is saved to assets/icon.png, ready for Xcode.
 *
 * Usage:
 *   node scripts/generate-icon.js
 *
 * Requirements (choose one):
 *   Option A — sharp (recommended, pure Node):
 *     npm install -D sharp
 *
 *   Option B — ImageMagick (system tool):
 *     brew install imagemagick
 *     Then run: magick assets/icon.svg -resize 1024x1024 assets/icon.png
 *
 *   Option C — Inkscape:
 *     brew install --cask inkscape
 *     Then run: inkscape assets/icon.svg --export-png=assets/icon.png -w 1024 -h 1024
 *
 * After generating icon.png, add it to Xcode:
 *   1. Open ios/App/App.xcworkspace in Xcode
 *   2. In the Project Navigator, click Assets.xcassets → AppIcon
 *   3. Drag assets/icon.png into the "1024x1024" App Store slot
 *   4. Use @capacitor/assets to auto-generate all sizes:
 *      npx @capacitor/assets generate --ios
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svgPath = join(root, 'assets', 'icon.svg')
const pngPath = join(root, 'assets', 'icon.png')

// Ensure assets dir exists
mkdirSync(join(root, 'assets'), { recursive: true })

if (!existsSync(svgPath)) {
  console.error('❌ assets/icon.svg not found. Run from the project root.')
  process.exit(1)
}

console.log('📐 Source SVG:', svgPath)

// Try sharp first
try {
  const { default: sharp } = await import('sharp')
  const svgBuffer = readFileSync(svgPath)
  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(pngPath)
  console.log('✅ Generated assets/icon.png (1024×1024) using sharp')
  console.log('')
  console.log('Next steps:')
  console.log('  1. Open ios/App/App.xcworkspace in Xcode')
  console.log('  2. Click Assets.xcassets → AppIcon')
  console.log('  3. Drag assets/icon.png into the 1024×1024 App Store slot')
  console.log('  OR run: npx @capacitor/assets generate --ios')
} catch {
  // sharp not available — print instructions
  console.log('ℹ️  sharp not installed. Choose one of these methods to convert SVG → PNG:\n')
  console.log('Option A — install sharp (easiest):')
  console.log('  npm install -D sharp')
  console.log('  node scripts/generate-icon.js\n')
  console.log('Option B — ImageMagick (brew install imagemagick):')
  console.log('  magick assets/icon.svg -resize 1024x1024 assets/icon.png\n')
  console.log('Option C — Inkscape (brew install --cask inkscape):')
  console.log('  inkscape assets/icon.svg --export-png=assets/icon.png -w 1024 -h 1024\n')
  console.log('Option D — Use @capacitor/assets (handles all sizes automatically):')
  console.log('  npx @capacitor/assets generate --ios --iconBackgroundColor "#0ea5e9" --iconForegroundImage assets/icon.svg')
}
