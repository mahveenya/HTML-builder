const fs = require('fs');
const path = require('node:path');

const absolutePath = path.join(__dirname, 'text.txt');

const rs = fs.createReadStream(absolutePath);

rs.pipe(process.stdout);
