import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';

async function generateMobileBackgrounds() {
  const inputPath = path.join(publicDir, 'hero-bg.png');
  
  console.log('Generating optimized mobile backgrounds from new hero-bg.png...');

  // Standard Mobile: width 640px
  await sharp(inputPath)
    .resize({ width: 640 })
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'Home-bg-mobile.webp'));

  // Very Small Mobile: width 320px
  await sharp(inputPath)
    .resize({ width: 320 })
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'Home-bg-mobile-320px.webp'));

  const sizeMobile = fs.statSync(path.join(publicDir, 'Home-bg-mobile.webp')).size;
  const sizeMobileSmall = fs.statSync(path.join(publicDir, 'Home-bg-mobile-320px.webp')).size;

  console.log('Finished generating mobile backgrounds:');
  console.log(`- Home-bg-mobile.webp: ${(sizeMobile / 1024).toFixed(2)} KB`);
  console.log(`- Home-bg-mobile-320px.webp: ${(sizeMobileSmall / 1024).toFixed(2)} KB`);
}

generateMobileBackgrounds().catch(console.error);
