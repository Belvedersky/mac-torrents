const _ = require('lodash');
const getTorrent = require('./get');

// menu functions
const selectTorrents = require('./menu/selectTorrents');
const writeInfoTorrent = require('./menu/infoTorrent');
const saveOrOpenTorrent = require('./menu/fileMenu');
const mainMenu = require('../index');

const saveTorrents = require('./utils/saveTorrents');
const saveAndOpenTorrent = require('./utils/openTorrent');

module.exports = async function getTorrentList(data) {
  const torrents = _.keyBy(data, 'title');
  const torrentName = await selectTorrents(torrents);
  if (torrentName == 'Main menu') {
    mainMenu.start();
  } else {
    const torrentInfo = await getTorrent(torrents[torrentName].link);
    writeInfoTorrent(torrentInfo);
    const usrAction = await saveOrOpenTorrent();

    switch (usrAction) {
      case 'Only save torrent file':
        saveTorrents(torrentInfo);
        break;

      case 'Save and open on torrent app':
        saveAndOpenTorrent(torrentInfo);
        break;

      default:
        console.clear();
        getTorrentList(torrents);
        break;
    }
  }
};
