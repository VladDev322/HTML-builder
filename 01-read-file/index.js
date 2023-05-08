const path = require('path');
const fs = require('fs');
const { stdout } = process;

const file = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(file, 'utf-8');
readableStream.on('error', error => {
  stdout.write('error ');
  stdout.write(error.message);
});
readableStream.on('data', chunk => stdout.write(chunk));