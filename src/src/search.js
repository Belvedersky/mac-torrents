import ora from 'ora';
import { isEmpty } from 'lodash';
import torrentmac from '../config';
import x from './utils/x-ray';

export default async (name) => {
  const spinner = ora(`Search torrents by name: ${name}`).start();
  try {
    const res = await x(`${torrentmac.url}/?s=${name}`,
      torrentmac.divList,
      torrentmac.post);
    if (isEmpty(res)) {
      spinner.stopAndPersist({
        symbol: '👻 ',
        text: `Not found any torrents by name: ${name}`,
      });
    } else {
      spinner.stopAndPersist({
        symbol: '✨',
        text: 'Get torrents',
      });
    }
    return res;
  } catch (err) {
    return err;
  }
};
