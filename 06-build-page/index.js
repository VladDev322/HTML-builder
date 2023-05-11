const path = require('path');
const fs = require('fs');

const projectDist = path.join(__dirname, 'project-dist');
const projectHTML = path.join(__dirname, 'project-dist', 'index.html');
const projectCSS = path.join(__dirname, 'project-dist', 'style.css');
// const header = path.join(__dirname, 'components', 'header.html');
// const articles = path.join(__dirname, 'components', 'articles.html');
// const footer = path.join(__dirname, 'components', 'footer.html');
const template = path.join(__dirname, 'template.html');

// const templateRS = fs.createReadStream(template, 'utf-8');
// const headerRS = fs.createReadStream(header, 'utf-8');
// const articlesRS = fs.createReadStream(articles, 'utf-8');
// const footerRS = fs.createReadStream(footer, 'utf-8');
const indexWS = fs.createWriteStream(projectHTML);

async function htmlPack() {
  let templateCode = (await fs.promises.readFile(template)).toString();
  
}

htmlPack();


// async function webPack() {
//   await fs.promises.mkdir(projectDist, {
//     recursive: true
//   });
// }

// webPack();