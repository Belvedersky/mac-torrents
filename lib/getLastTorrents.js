// const Xray = require('x-ray');
// var x = Xray().limit(10)

// x('https://www.torrentmac.net', 'article.clearfix')(function(err, title) {
//   console.log(title) // Google
// });

const xray = require('x-ray');
const settings = require('./config');
const x = xray();

const getLastTorrents = (spinner) => {
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

exports.getLastTorrents = getLastTorrents;
