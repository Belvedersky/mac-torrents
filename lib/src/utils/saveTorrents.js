const ora = require('ora');
const downloadTorrent = require('./download');

module.exports = async (data) => {
  const spinner = ora('Save torrent file').start();
  const name = data.title.toLowerCase().split(' ').join('_');
  downloadTorrent(data.file, name, () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Save ${name}.torrent`,
    });
  });
};


