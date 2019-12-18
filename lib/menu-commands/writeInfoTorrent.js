const chalk = require('chalk');
const wrapAnsi = require('wrap-ansi');

function writeInfoTorrent(data) {
  console.log(chalk`
-- {blue ${data.title} } --

Date:  {green ${data.time}}
Size: {yellow ${data.size}}
Category: {rgb(255,131,0)  ${data.category}}
`);
  console.log(wrapAnsi(data.description, 40));
  console.log('\n');
};

module.exports = writeInfoTorrent;