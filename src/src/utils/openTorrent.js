/* eslint-disable no-console */
import ora from 'ora';
import open from 'open';
import downloadsFolder from 'downloads-folder';
import { camelCase } from 'lodash';
import downloadTorrent from './download';
import webTorrent from './webtorrent';

export default (data) => {
  const spinner = ora('Save torrent file').start();
  const name = camelCase(data.title);
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
    // eslint-disable-next-line no-param-reassign
    data.downloadsFolder = downloadsFolder();
    try {
      await openfile();
    } catch (error) {
      console.log(error);
    } finally {
      spinner.stopAndPersist({
        symbol: '✨',
        text: `Open ${name}.torrent`,
      });
    }
  });
};
