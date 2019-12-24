import ora from 'ora';
import torrentmac from '../config';
import x from './utils/x-ray';

export default async function () {
  const spinner = ora('Loading torrents').start();
  try {
    const res = await x(
      torrentmac.url,
      torrentmac.divList,
      torrentmac.post,
    );
    spinner.stopAndPersist({
      symbol: '✨',
      text: 'Get all torrents',
    });
    return res;
  } catch (err) {
    return err;
  }
}
