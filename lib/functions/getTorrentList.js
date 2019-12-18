const _ = require('lodash');

const getTorrent = require('./getTorrent')

// menu functions
const selectTorrents = require('../menu-commands/selectTorrents')
const writeInfoTorrent = require('../menu-commands/writeInfoTorrent')
const saveOrOpenTorrent = require('../menu-commands/saveOrOpenTorrent')

// BL functions
const saveTorrents = require('./save-torrent-functions/saveTorrents');
const saveAndOpenTorrent = require('./save-torrent-functions/saveAndOpenTorrent');

async function getTorrentList(data) {
  const torrents = _.keyBy(data, 'title');
  var torrentName = await selectTorrents(torrents);
  var torrentInfo = await getTorrent(torrents[torrentName].link);
  writeInfoTorrent(torrentInfo);
  var usrAction = await saveOrOpenTorrent();

  switch (usrAction) {
    case 'Only save torrent file':
      await saveTorrents(torrentInfo);
      break;

    case 'Save and open on torrent app':
      await saveAndOpenTorrent(torrentInfo);
      break;

    default:
      console.clear();
      this.getTorrentList(torrents);
      break;
  }
};

module.exports = getTorrentList;