const xray = require('x-ray');
const x = xray();
const config = require('./config');
const _ = require('lodash');

exports.searchTorrent = async (torrent, spinner) => {
  return x(
      `${config.torrentmac.url}/?s=${torrent}`,
      config.torrentmac.divList,
      config.torrentmac.post)
      .then(function(res) {
        if (_.isEmpty(res)) {
          spinner.stopAndPersist({
            symbol: '🌚',
            text: 'Not found!',
          });
          return 0;
        } else {
          spinner.stopAndPersist({
            symbol: '✨',
            text: 'Get torrents',
          });
          return res;
        }
      })
      .catch(function(err) {
        console.log(err); // handle error in promise
      });
};


exports.searchTorrentByCategory = async (category, spinner) => {
  return x(
      // eslint-disable-next-line max-len
      `${config.torrentmac.url}/category/${config.torrentmac.category[category]}`,
      config.torrentmac.divList,
      config.torrentmac.post)
      .then(function(res) {
        spinner.stopAndPersist({
          symbol: '✨',
          text: `Get torrents by category ${category}`,
        });
        return res;
      })
      .catch(function(err) {
        console.log(err); // handle error in promise
      });
};
