const fs = require('fs/promises');
const path = require('node:path');

const secretFolder = path.join(__dirname, 'secret-folder');

async function displayFilesInfo() {
  try {
    const items = await fs.readdir(secretFolder, { withFileTypes: true });

    for (const item of items) {
      if (item.isFile()) {
        const filePath = path.join(secretFolder, item.name);
        const stats = await fs.stat(filePath);
        const fileName = path.parse(item.name).name;
        const fileExtension = path.parse(item.name).ext.slice(1);
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
      }
    }
  } catch (err) {
    console.error('Error reading secret-folder:', err.message);
  }
}

displayFilesInfo();
