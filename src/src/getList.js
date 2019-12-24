/* eslint-disable import/no-cycle */
import { keyBy } from 'lodash';
import getTorrent from './get';

// menu functions
import selectTorrents from './menu/selectTorrents';
import writeInfoTorrent from './menu/infoTorrent';
import saveOrOpenTorrent from './menu/fileMenu';
import start from '../index';

import saveTorrents from './utils/saveTorrents';
import saveAndOpenTorrent from './utils/openTorrent';

/**
 * getTorrentList
 * @param {obj} data from x-ray
 */
export default async function getTorrentList(data) {
  const torrents = keyBy(data, 'title');
  const torrentName = await selectTorrents(torrents);
  if (torrentName === 'Main menu') {
    start();
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
        // eslint-disable-next-line no-console
        console.clear();
        getTorrentList(torrents);
        break;
    }
  }
}
