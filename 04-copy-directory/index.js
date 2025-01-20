const { copyFile, mkdir, readdir, rm } = require('fs/promises');
const { join } = require('node:path');

const filesFolder = join(__dirname, 'files');
const filesCopyFolder = join(__dirname, 'files-copy');

const copyDir = async () => {
  try {
    await rm(filesCopyFolder, { recursive: true, force: true });
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
