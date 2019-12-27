/* eslint-disable import/no-cycle */
// Menu functions
import mainMenu from './src/menu/mainMenu';
import findMenu from './src/menu/findMenu';
import categoryMenu from './src/menu/categoryMenu';

// functions
import getTorrentList from './src/getList';
import getLastTorrents from './src/getLast';
import getTorrentsByCategory from './src/getByCategory';
import searchTorrents from './src/search';

export default async function start() {
  switch (await mainMenu()) {
    case 'Get top-list torrents list':
      await getTorrentList(await getLastTorrents());
      break;

    case 'Search torrent by name':
      await findMenu().then(async (data) => {
        await searchTorrents(data).then(async (list) => {
          await getTorrentList(list);
        });
      });
      break;

    case 'Search torrent by categories':
      await categoryMenu().then(async (data) => {
        if (data === 'Main menu') {
          start();
        } else {
          getTorrentList(await getTorrentsByCategory(data));
        }
      });
      break;

    case 'Settings':
      // eslint-disable-next-line no-console
      console.log('TODO');
      break;

    default:
      break;
  }
}
