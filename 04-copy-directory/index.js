const path = require('path');
const fs = require('fs');

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.promises.rm(newFolder, { recursive: true, force: true });
  await fs.promises.mkdir(newFolder, { recursive: true });

  const allFiles = await fs.promises.readdir(oldFolder);
  for (let file of allFiles) {
    let oldFile = path.join(oldFolder, file);
    let newFile = path.join(newFolder, file);
    await fs.promises.copyFile(oldFile, newFile);
  }
}

copyDir();