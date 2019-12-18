// Menu functions
const mainMenu = require('./src/menu/mainMenu');
const findMenu = require('./src/menu/findMenu');
const categoryMenu = require('./src/menu/categoryMenu');

// functions
const getTorrentList = require('./src/getList');
const getLastTorrents = require('./src/getLast');
const getTorrentsByCategory = require('./src/getByCategory');
const searchTorrents = require('./src/search');

module.exports.start = async function selectMenu() {
  switch (await mainMenu()) {
    case 'Get top-list torrents list':
      const lastTorrent = await getLastTorrents();
      getTorrentList(lastTorrent);
      break;

    case 'Search torrent by name':
      const userNameTorrentChoise = await findMenu();
      const foundTorrents = await searchTorrents(userNameTorrentChoise);
      getTorrentList(foundTorrents);
      break;

    case 'Search torrent by categories':
      const categoryChoise = await categoryMenu();
      if (categoryChoise == 'Main menu') {
        selectMenu();
      } else {
        const categoryTorrents = await getTorrentsByCategory(categoryChoise);
        getTorrentList(categoryTorrents);
      }
      break;

    case 'Settings':
      console.log('TODO');
      break;

    default:
      break;
  }
};
