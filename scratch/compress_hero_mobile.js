import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';

async function compressImage() {
  const inputPath = path.join(publicDir, 'home-bg-mobile.png');
  const outputPath = path.join(publicDir, 'hero-bg-mobile.webp');
  const outputPathSmall = path.join(publicDir, 'hero-bg-mobile-320px.webp');

  console.log(`Compressing home-bg-mobile.png to hero-bg-mobile.webp and hero-bg-mobile-320px.webp...`);

  // Standard Mobile
  await sharp(inputPath)
    .resize({ width: 640 })
    .webp({ quality: 80 })
    .toFile(outputPath);

  // Small Mobile
  await sharp(inputPath)
    .resize({ width: 320 })
    .webp({ quality: 80 })
    .toFile(outputPathSmall);

  const originalSize = fs.statSync(inputPath).size;
  const compressedSize = fs.statSync(outputPath).size;
  const compressedSmallSize = fs.statSync(outputPathSmall).size;

  console.log(`Finished:`);
  console.log(`- Original Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`- Compressed Size (640px): ${(compressedSize / 1024).toFixed(2)} KB`);
  console.log(`- Compressed Small Size (320px): ${(compressedSmallSize / 1024).toFixed(2)} KB`);
}

compressImage().catch(console.error);
