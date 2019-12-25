import { camelCase } from 'lodash';
import Spinner from './spinner';
import downloadTorrent from './download';

export default async (data) => {
  const name = camelCase(data);
  const spinner = new Spinner('Save torrent file', `save ${name}.torrent`);
  try {
    spinner.start();
    downloadTorrent(data.file, name, () => {
      spinner.stop();
    });
    return true;
  } catch (error) {
    return error;
  }
};
