const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');
const dbJsonPath = path.join(__dirname, '../db.json');

async function runOptimization() {
  console.log('=== VEL BIO MED PRODUCT IMAGE OPTIMIZATION ===\n');

  // Read all files in public/images
  const allFiles = fs.readdirSync(imagesDir);
  const prodFiles = allFiles.filter(f => /^prod-\d+\.(png|jpg|jpeg|webp)$/i.test(f));

  console.log(`Found ${prodFiles.length} product images in ${imagesDir}.\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const results = [];

  for (const file of prodFiles) {
    const originalPath = path.join(imagesDir, file);
    const stat = fs.statSync(originalPath);
    const originalSize = stat.size;
    totalOriginalSize += originalSize;

    const baseName = path.parse(file).name; // e.g. "prod-1"
    const webpFileName = `${baseName}.webp`;
    const webpPath = path.join(imagesDir, webpFileName);
    const tempWebpPath = path.join(imagesDir, `${baseName}_temp_opt.webp`);

    try {
      const meta = await sharp(originalPath).metadata();

      // Sharp webp conversion settings:
      // - Max dimension 1200px (retains 2x Retina clarity, prevents 4000px bloated files)
      // - Quality: 85 (virtually lossless visual quality)
      // - Effort: 6 (maximum compression CPU effort)
      // - Preserve transparency (alphaQuality: 90)
      let pipeline = sharp(originalPath);
      if (meta.width > 1200 || meta.height > 1200) {
        pipeline = pipeline.resize({
          width: meta.width > meta.height ? 1200 : undefined,
          height: meta.height >= meta.width ? 1200 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      await pipeline
        .webp({
          quality: 85,
          alphaQuality: 90,
          effort: 6,
          smartSubsampling: true
        })
        .toFile(tempWebpPath);

      const optStat = fs.statSync(tempWebpPath);
      const optSize = optStat.size;
      totalOptimizedSize += optSize;

      // Replace target webp file with tempWebpPath
      fs.renameSync(tempWebpPath, webpPath);

      // If original file was .png, .jpg, or .jpeg (not already .webp with same name), remove original
      if (file !== webpFileName && fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
      }

      const optMeta = await sharp(webpPath).metadata();
      const reduction = (((originalSize - optSize) / originalSize) * 100).toFixed(1);

      results.push({
        file,
        newFile: webpFileName,
        origKB: (originalSize / 1024).toFixed(1),
        newKB: (optSize / 1024).toFixed(1),
        origRes: `${meta.width}x${meta.height}`,
        newRes: `${optMeta.width}x${optMeta.height}`,
        reductionPercent: `${reduction}%`,
        savedBytes: originalSize - optSize
      });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
      if (fs.existsSync(tempWebpPath)) {
        fs.unlinkSync(tempWebpPath);
      }
    }
  }

  // Sort by savings
  results.sort((a, b) => b.savedBytes - a.savedBytes);

  console.log('--- TOP 20 BIGGEST FILE SIZE REDUCTIONS ---');
  console.table(
    results.slice(0, 20).map(r => ({
      'Original File': r.file,
      'Original Size': `${r.origKB} KB`,
      'Optimized Size': `${r.newKB} KB`,
      'Original Res': r.origRes,
      'Optimized Res': r.newRes,
      'Saved %': r.reductionPercent
    }))
  );

  const totalOrigMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const totalOptMB = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
  const totalSavedMB = ((totalOriginalSize - totalOptimizedSize) / (1024 * 1024)).toFixed(2);
  const totalReduction = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);

  console.log('\n================ SUMMARY ================');
  console.log(`Total Original Size  : ${totalOrigMB} MB (${totalOriginalSize} bytes)`);
  console.log(`Total Optimized Size : ${totalOptMB} MB (${totalOptimizedSize} bytes)`);
  console.log(`Total Savings        : ${totalSavedMB} MB (${totalReduction}% Reduction!)`);
  console.log('=========================================\n');

  // Update db.json image references to point to .webp
  console.log('Updating db.json image paths...');
  const dbRaw = fs.readFileSync(dbJsonPath, 'utf-8');
  let dbData = JSON.parse(dbRaw);

  let updatedCount = 0;
  if (Array.isArray(dbData.products)) {
    dbData.products = dbData.products.map(p => {
      if (p.image && typeof p.image === 'string') {
        const oldImg = p.image;
        // Convert e.g. "/images/prod-1.jpg" or "/images/prod-2.png" to "/images/prod-1.webp"
        const newImg = oldImg.replace(/\/images\/(prod-\d+)\.(png|jpg|jpeg|webp)$/i, '/images/$1.webp');
        if (oldImg !== newImg) {
          updatedCount++;
          return { ...p, image: newImg };
        }
      }
      return p;
    });
  }

  fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log(`Successfully updated ${updatedCount} product image paths in db.json.\n`);
}

runOptimization().catch(console.error);
