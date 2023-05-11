const path = require('path');
const fs = require('fs');

const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToProjectHTML = path.join(__dirname, 'project-dist', 'index.html');
const pathToProjectCSS = path.join(__dirname, 'project-dist', 'style.css');
const pathToProjectAssets = path.join(__dirname, 'project-dist', 'assets');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponentsFolder = path.join(__dirname, 'components');
const pathToStylesFolder = path.join(__dirname, 'styles');
const pathToAssetsFolder = path.join(__dirname, 'assets');

async function htmlPack() {
  let templateCode = (await fs.promises.readFile(pathToTemplate)).toString();
  const templateTags = templateCode.match(/{{[a-z]*}}/g);
  for (const tag of templateTags) {
    const tagName = tag.slice(2, -2);
    const componentFileName = `${tagName}.html`;
    const pathToComponentFile = path.join(
      pathToComponentsFolder,
      componentFileName
    );
    try {
      const componentContent = await fs.promises.readFile(
        pathToComponentFile, { encoding: 'utf-8' }
      );
      templateCode = templateCode.replace(tag, componentContent);
    }
    catch {
      console.error(`ERROR: ${componentFileName} is missing!`);
    }
  }
  const ProjectHTML_WS = fs.createWriteStream(pathToProjectHTML);
  ProjectHTML_WS.write(templateCode);
}

async function cssPack() {
  let files = await fs.promises.readdir(pathToStylesFolder, { withFileTypes: true });
  const bundleWS = fs.createWriteStream(pathToProjectCSS);
  files.forEach(file => {
    if (path.extname(file.name) === '.css') {
      const cssFilePath = path.join(pathToStylesFolder, file.name);
      const cssFile = fs.createReadStream(cssFilePath, 'utf-8');
      cssFile.on('data', chunk => bundleWS.write(chunk));
    }
  });
}

async function assetsPack() {
  //create 06-build-page/project-dist/asstets
  await fs.promises.rm(pathToProjectAssets, { recursive: true, force: true });
  await fs.promises.mkdir(pathToProjectAssets, { recursive: true });

  //read all folders in 06-build-page/assets 
  const allAssetsFolders = await fs.promises.readdir(pathToAssetsFolder);
  allAssetsFolders.forEach(async folderName => {
    let projectAssetsFolder = path.join(pathToProjectAssets, folderName);
    //copy this (empty) folders to 06-build-page/project-dist/asstets
    await fs.promises.mkdir(projectAssetsFolder, { recursive: true });

    //read all files in 06-build-page/assets 
    let assetsFolderName = path.join(pathToAssetsFolder, folderName);
    const filesInAssetsFolder = await fs.promises.readdir(assetsFolderName);
    filesInAssetsFolder.forEach(async assetsfileName => {
      let pathToAssetsFile = path.join(assetsFolderName, assetsfileName);
      let pathToProjectAssetsFile = path.join(projectAssetsFolder, assetsfileName);
      //copy this files to 06-build-page/project-dist/asstets/(folder)
      await fs.promises.copyFile(pathToAssetsFile, pathToProjectAssetsFile);
    });
  });
}

async function webPack() {
  await fs.promises.mkdir(pathToProjectDist, { recursive: true });
  htmlPack();
  cssPack();
  assetsPack();
}

webPack();