import ora from 'ora';
import torrentmac from '../config';
import x from './utils/x-ray';

export default async (url) => {
  const spinner = ora('Get torrent info').start();
  try {
    const res = await x(
      url,
      torrentmac.divTorrent,
      torrentmac.torrent,
    );
    res.category = res.category.split(',');
    res.size = `${res.size.split('Size:')[1].split('MB')[0]}Mb`;
    spinner.stopAndPersist({
      symbol: '✨',
      text: 'Get torrent',
    });
    return res;
  } catch (err) {
    return err;
  }
};
