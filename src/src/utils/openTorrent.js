/* eslint-disable no-console */
import open from 'open';
import downloadsFolder from 'downloads-folder';
import { camelCase } from 'lodash';
import Spinner from './spinner';
import downloadTorrent from './download';
import webTorrent from './webtorrent';

export default (data) => {
  const name = camelCase(data.title);
  const spinner = new Spinner('Save torrent file', `save ${name}.torrent`);
  spinner.start();

  const openfile = () => {
    const openFile = open(`${downloadsFolder()}/${name}.torrent`, {});
    openFile.then((e) => {
      e.stderr.addListener('data', async () => {
        await webTorrent(data);
      });
    });
    return openFile;
  };
  downloadTorrent(data.file, name, async () => {
    data.downloadsFolder = downloadsFolder();
    try {
      await openfile();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.stop();
    }
  });
};
