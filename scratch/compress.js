import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';

async function compressImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const baseName = path.basename(filename, path.extname(filename));
  const outputPath = path.join(publicDir, `${baseName}.webp`);

  console.log(`Compressing ${filename} to ${baseName}.webp...`);

  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);

  const originalSize = fs.statSync(inputPath).size;
  const compressedSize = fs.statSync(outputPath).size;

  console.log(`Finished ${filename}:`);
  console.log(`- Original Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Compressed Size: ${(compressedSize / 1024).toFixed(2)} KB`);
}

async function run() {
  try {
    await compressImage('Home-bg-mobile.png');
    await compressImage('Home-bg-mobile-320px.png');
  } catch (err) {
    console.error('Error during compression:', err);
  }
}

run();
