const ora = require('ora');
const xray = require('x-ray');
const x = xray();
const config = require('../config');

async function getTorrent(url) {
  const spinner = ora('Get torrent info').start();
  try {
    const res = await x(url, config.torrentmac.divTorrent, config.torrentmac.torrent);
    res.category = res.category.split(',');
    res.size = res.size.split('Size:')[1].split('MB')[0] + 'Mb';
    spinner.stopAndPersist({
      symbol: '✨',
      text: 'Get torrent',
    });
    return res;
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = getTorrent;