const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const file = path.join(__dirname, 'output.txt');
const output = fs.createWriteStream(file);

stdout.write('Введите текст, который запишется в output.txt\n');

stdin.on('data', (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.trim() === 'exit') process.exit();
  output.write(chunkStringified);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('Готово!'));