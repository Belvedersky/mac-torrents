// menu functions
const mainMenu = require('./menu-commands/mainMenu');
const findMenu = require('./menu-commands/findMenu');
const categoryMenu = require('./menu-commands/categoryMenu');

// BL functions
const getTorrentList = require('./functions/getTorrentList');
const getLastTorrents = require('./functions/getLastTorrents');
const getTorrentsByCategory = require('./functions/getTorrentsByCategory');
const searchTorrents = require('./functions/searchTorrents');

exports.start = async () => {

  switch (await mainMenu()) {

    case 'Get top-list torrents list':
      var lastTorrent = await getLastTorrents();
      getTorrentList(lastTorrent);
      break;

    case 'Search torrent by name':
      var userNameTorrentChoise = await findMenu();
      var foundTorrents = await searchTorrents(userNameTorrentChoise);
      getTorrentList(foundTorrents);
      break;

    case 'Search torrent by categories':
      var userCategoryTorrentChoise = await categoryMenu()
      var categoryTorrents = await getTorrentsByCategory(userCategoryTorrentChoise);
      getTorrentList(categoryTorrents);
      break;

    case 'Settings':
      console.log(this.toDo);
      break;

    default:
      break;
  }
}

exports.toDo = `
TODO:
-> Add search by categories
-> Manage menu
-> Add select torrent program like: Transmittion, WebTorrent, uTorrent,
-> Add select input website as config.js and save this as .json`;
