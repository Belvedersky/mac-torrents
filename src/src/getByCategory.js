
import ora from 'ora';
import torrentmac from '../config';
import x from './utils/x-ray';

export default async (category) => {
  const spinner = ora('Get torrent info').start();
  try {
    const res = await x(
      // eslint-disable-next-line max-len
      `${torrentmac.url}/category/${torrentmac.category[category]}`,
      torrentmac.divList, torrentmac.post,
    );
    spinner.stopAndPersist({
      symbol: '✨',
      text: `Get torrents by category ${category}`,
    });
    return res;
  } catch (err) {
    return err;
  }
};
