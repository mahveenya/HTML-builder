const { mkdir, readdir, unlink } = require('fs/promises');
const { createReadStream, createWriteStream } = require('fs');
const { join, parse } = require('node:path');

const stylesFolder = join(__dirname, 'styles');
const distFolder = join(__dirname, 'project-dist');
const bundleFile = join(distFolder, 'bundle.css');

async function mergeStyles() {
  try {
    await mkdir(distFolder, { recursive: true });
    await unlink(bundleFile);

    const items = await readdir(stylesFolder, { withFileTypes: true });

    for (const item of items) {
      const itemExt = parse(item.name).ext.slice(1);

      if (item.isFile() && itemExt == 'css') {
        const rs = createReadStream(join(`${item.path}`, `${item.name}`));
        const ws = createWriteStream(bundleFile, { flags: 'a' });

        rs.pipe(ws);
      }
    }
  } catch (e) {
    throw new Error(`FS operation failed:\n${e.message}`);
  }
}

mergeStyles();
