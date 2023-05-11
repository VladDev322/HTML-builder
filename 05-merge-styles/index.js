const path = require('path');
const fs = require('fs');

const styles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const bundleWS = fs.createWriteStream(bundle);

async function createCSS() {
  let files = await fs.promises.readdir(styles, { withFileTypes: true });
  files.forEach(file => {
    if (path.extname(file.name) === '.css') {
      const cssFilePath = path.join(styles, file.name);
      const cssFile = fs.createReadStream(cssFilePath, 'utf-8');
      cssFile.on('data', chunk => bundleWS.write(chunk));
    }
  });
}

createCSS();