const xray = require('x-ray');
const x = xray();
const config = require('./config');

const searchTorrent = (torrent, spinner) => {
  x(
      `${config.torrentmac.url}/?s=${torrent}`,
      config.torrentmac.divList,
      config.torrentmac.post,
  )
      .then(function(res) {
        console.log(res);
        spinner.stopAndPersist({
          symbol: '✨',
          text: 'Get torrents',
        });
        return res;
      })
      .catch(function(err) {
        console.log(err); // handle error in promise
      });
};
exports.searchTorrent = searchTorrent;
