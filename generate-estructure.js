const fs = require('fs');
const path = require('path');

function listDirectories(dir, depth = 3, prefix = '') {
  if (depth === 0) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    console.log(`${prefix}${entry.name}`);
    if (entry.isDirectory()) {
      listDirectories(path.join(dir, entry.name), depth - 1, `${prefix}  `);
    }
  });
}

listDirectories('./src', 3);
