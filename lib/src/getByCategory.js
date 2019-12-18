const xray = require('x-ray');
const config = require('../config');
const ora = require('ora');

const x = xray();

module.exports = async (category) => {
  const spinner = ora('Get torrent info').start();
  try {
    const res = await x(
        // eslint-disable-next-line max-len
        `${config.torrentmac.url}/category/${config.torrentmac.category[category]}`,
        config.torrentmac.divList, config.torrentmac.post);
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Get torrents by category ${category}`,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

