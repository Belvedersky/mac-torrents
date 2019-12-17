const xray = require('x-ray');
const settings = require('./config');
const x = xray();

exports.getLastTorrents = (spinner) => {
  return x(
      settings.torrentmac.url,
      settings.torrentmac.divList,
      settings.torrentmac.post,
  )
      .then(function(res) {
        spinner.stopAndPersist({
          symbol: '✨',
          text: 'Get all torrents',
        });
        return res;
      })
      .catch(function(err) {
        console.log(err); // handle error in promise
      });
};

