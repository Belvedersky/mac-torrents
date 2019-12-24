/* eslint-disable no-console */
import WebTorrent from 'webtorrent';
import { SingleBar, Presets } from 'cli-progress';

export default async (data) => {
  console.log('\nNot found torrent app. download with webtorrent');
  const client = new WebTorrent();
  const b1 = new SingleBar({},
    Presets.shades_classic);
  b1.start(1, 0, {
    speed: 'N/A',
  });
  client.add(data.file,
    { path: data.downloadsFolder }, (torrent) => {
      torrent.on('download', () => {
        b1.update(torrent.progress);
      });
      torrent.on('done', () => {
        b1.stop();
        console.log('download complete 👌🏻');
      });
    });
};
