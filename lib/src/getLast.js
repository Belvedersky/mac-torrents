const xray = require('x-ray');
const settings = require('../config');
const ora = require('ora');
const x = xray();

module.exports = async () => {
  const spinner = ora('Loading torrents').start();
  try {
    const res = await x(
        settings.torrentmac.url,
        settings.torrentmac.divList,
        settings.torrentmac.post,
    );
    spinner.stopAndPersist({
      symbol: '✨',
      text: 'Get all torrents',
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
