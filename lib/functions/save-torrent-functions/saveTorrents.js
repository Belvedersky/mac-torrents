const ora = require('ora');
const downloadTorrent = require('./downloadTorrent');

async function saveTorrents(data) {
  const spinner = ora('Save torrent file').start();
  const name = data.title.toLowerCase().split(' ').join('_');
  downloadTorrent(data.file, name, () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Save ${name}.torrent`,
    });
  });
};

module.exports = saveTorrents;