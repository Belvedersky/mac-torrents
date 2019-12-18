const ora = require('ora');
const open = require('open');
const downloadsFolder = require('downloads-folder');
const downloadTorrent = require('./download');

module.exports = async (data) => {
  const spinner = ora('Save torrent file').start();
  const name = data.title
      .toLowerCase()
      .split(' ')
      .join('_');

  await downloadTorrent(data.file, name, async () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Open ${name}.torrent`,
    });
    await open(`${downloadsFolder()}/${name}.torrent`);
    return true;
  })
      // .then((e) => console.log(e)) /🌝
      .catch((e) => {
        console.log('\nNot found torrent app.. download with webtorrent...');
        const WebTorrent = require('webtorrent');
        const client = new WebTorrent();
        client.add(data.file, {path: `${downloadsFolder()}`}, () => {
          console.log(`\n ${name} скачался и находится в папке Загрузки`);
        });
      });
};
