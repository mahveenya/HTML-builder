const fs = require('fs');
const path = require('node:path');

const absolutePath = path.join(__dirname, 'output.txt');
const ws = fs.createWriteStream(absolutePath, { flags: 'a' });

console.log(
  '*****************************************************************\nWelcome! Type anything and press Enter to write it to output.txt.\nType "exit" on a new line or press "Ctrl+c" to quit the program.\n*****************************************************************\n',
);

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk) => {
  const input = chunk.trim();

  if (input === 'exit') {
    console.log('\nGoodbye! Process terminated.');
    ws.end();
    process.exit();
  }

  ws.write(`${input}\n`);
});

process.on('SIGINT', () => {
  console.log('\nGoodbye! Process terminated.');
  ws.end();
  process.exit();
});
