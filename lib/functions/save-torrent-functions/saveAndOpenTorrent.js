const ora = require('ora');
const open = require('open');
const downloadsFolder = require('downloads-folder');
const downloadTorrent = require('./downloadTorrent');

async function saveAndOpenTorrent(data) {
  const spinner = ora('Save torrent file').start();
  const name = data.title.toLowerCase().split(' ').join('_');
  downloadTorrent(data.file, name, async () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Open ${name}.torrent`,
    });
    await open(`${downloadsFolder()}/${name}.torrent`, {wait: true});
  });
};

module.exports = saveAndOpenTorrent;