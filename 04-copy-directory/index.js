const { copyFile, mkdir, readdir } = require('fs/promises');
const { join } = require('node:path');

const copyDir = async () => {
  try {
    const filesFolder = join(__dirname, 'files');
    const filesCopyFolder = join(__dirname, 'files-copy');

    await mkdir(filesCopyFolder, { recursive: true });

    const filesToCopy = await readdir(filesFolder);

    await Promise.all(
      filesToCopy.map(
        async (file) =>
          await copyFile(join(filesFolder, file), join(filesCopyFolder, file)),
      ),
    );
  } catch (e) {
    throw new Error(`FS operation failed:\n${e.message}`);
  }
};

copyDir();
