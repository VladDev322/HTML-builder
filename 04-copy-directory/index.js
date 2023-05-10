const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) return console.error(err);
});

const oldFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

fs.promises.readdir(oldFolder)
  .then(files => {
    files.forEach(file => {
      let filePath =  path.join(oldFolder, file);
      let fileDir = path.join(newFolder, file);
      fs.copyFile(filePath, fileDir, (err) => {
        if (err) return console.log(err);
      });
    });
  });

