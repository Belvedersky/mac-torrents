import { isEmpty } from 'lodash';
import Spinner from './utils/spinner';
import config from '../config.json';
import x from './utils/x-ray';

export default async (name) => {
  const spinner = new Spinner(`Search torrents by name: ${name}`);
  try {
    spinner.start();
    const res = await x(`${config.torrentmac.url}/?s=${name}`,
      config.torrentmac.divList,
      config.torrentmac.post);

    if (isEmpty(res)) {
      spinner.stop('👻', `Not found any torrents by name: ${name}`);
    } else {
      spinner.stop('✨ ', `Get torrents by name: ${name}`);
    }
    return res;
  } catch (err) {
    return err;
  }
};
