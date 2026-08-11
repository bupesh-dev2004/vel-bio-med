const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');
const dbRaw = fs.readFileSync(dbPath, 'utf-8');
const db = JSON.parse(dbRaw);

let count = 0;
if (Array.isArray(db.products)) {
  db.products.forEach(p => {
    if (p.image && typeof p.image === 'string') {
      const updated = p.image.replace(/(\/images\/prod-\d+)\.(jpg|jpeg|png|webp)/i, '$1.webp');
      if (updated !== p.image) {
        console.log(`${p.image} -> ${updated}`);
        p.image = updated;
        count++;
      }
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log(`\nUpdated ${count} product image URLs in db.json to .webp`);
