const ora = require('ora');
const xray = require('x-ray');
const config = require('../config');
const x = xray();

module.exports = async (name) => {
  const spinner = ora(`Search torrents by name: ${name}`).start();
  try {
    const res = await x(`${config.torrentmac.url}/?s=${name}`,
        config.torrentmac.divList, config.torrentmac.post);
    spinner.stopAndPersist({
      symbol: '✨',
      text: 'Get torrents',
    });
    return res;
  } catch (err) {
    console.log(err); // handle error in promise
  }
};
