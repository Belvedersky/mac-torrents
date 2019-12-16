const xray = require('x-ray');
const x = xray();
// const downloadsFolder = require('downloads-folder');
// const utils = require('./utils');
const config = require('./config');

exports.getTorrent = (url, spinner) => {
  return x(url, config.torrentmac.divTorrent, config.torrentmac.torrent)
      .then((res) => {
        res.category = res.category.split(',');
        res.size = res.size.split('Size:')[1].split('MB')[0]+'Mb';
        spinner.stopAndPersist({
          symbol: '✨',
          text: 'Get torrent',
        });
        // utils.download(res[0].file, `${res[0].title}`, () => {
        //   console.log(`Save: ${downloadsFolder()}/${res[0].title}.torrent`);
        // });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
};
