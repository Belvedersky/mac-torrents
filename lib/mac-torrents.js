/* eslint-disable no-tabs */

const ora = require('ora');
const getTorrent = require('./getTorrent');
const getTorrents = require('./getLastTorrents');
const searchTorrents = require('./searchTorrents');
const utils = require('./utils');


exports.getLastTorrents = async () =>{
  const spinner = ora('Loading torrents').start();
  const torrents = await getTorrents.getLastTorrents(spinner);
  return torrents;
};

exports.searchTorrents = async (name) =>{
  const spinner = ora(`Search torrents by name: ${name}`).start();
  const torrents = await searchTorrents.searchTorrent(name, spinner);
  return torrents;
};

exports.getTorrents = async (name) =>{
  const spinner = ora('Get torrent info').start();
  const torrent = await getTorrent.getTorrent(name, spinner);
  return torrent;
};

exports.getTorrentsByCategory = async (name) =>{
  const spinner = ora('Get torrent info').start();
  const torrent = await searchTorrents.searchTorrentByCategory(name, spinner);
  return torrent;
};

exports.saveTorrents = (data) =>{
  const spinner = ora('Save torrent file').start();
  const name = data.title.toLowerCase().split(' ').join('_');
  utils.download(data.file, name, () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Save ${name}.torrent`,
    });
  });
};

exports.saveAndOpenTorrent = (data) =>{
  const spinner = ora('Save torrent file').start();
  const name = data.title.toLowerCase().split(' ').join('_');
  utils.download(data.file, name, () => {
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Open ${name}.torrent`,
    });
    utils.open(name);
  });
};
