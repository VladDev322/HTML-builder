const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const { stdout } = process;

const secretFolder = path.join(__dirname, 'secret-folder');

fsPromises.readdir(secretFolder, { withFileTypes: true })
  .then(results => {
    results.forEach(result => {
      if (!result.isDirectory()) {
        const filePath = path.join(secretFolder, result.name);
        const fileName = result.name;
        const FileExt = path.extname(fileName);

        fsPromises
          .stat(filePath)
          .then(res => {
            stdout.write(`${fileName.replace(FileExt, '')} - ${FileExt.replace('.', '')} - ${Number(res.size / 1024)}kb \n`);
          });
      }
    });
  });