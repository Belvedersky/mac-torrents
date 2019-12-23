const ora = require('ora');
const open = require('open');
const downloadsFolder = require('downloads-folder');
const downloadTorrent = require('./download');
const WebTorrent = require('webtorrent');
const cliProgress = require('cli-progress');

module.exports = async (data) => {
  var spinner = ora('Save torrent file').start();
  const name = data.title
      .toLowerCase()
      .split(' ')
      .join('_');

  await downloadTorrent(data.file, name, async () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Open ${name}.torrent`,
    });
  });

  await open(`${downloadsFolder()}/${name}.torrent`, {wait: true})
  .then(e => console.log(e))
  .catch((e) => {
    console.log('\nNot found torrent app.. download with webtorrent...');
    const client = new WebTorrent();
    const b1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    b1.start(1, 0, {
      speed: "N/A"
    });
    client.add(data.file, {path: `${downloadsFolder()}`}, function (torrent) {

      torrent.on('download', function(bytes) {
        b1.update(torrent.progress);
      });

      torrent.on('done', function() {
        b1.stop();
        console.log('загрузка завершена');
      });
    });
  });

};
