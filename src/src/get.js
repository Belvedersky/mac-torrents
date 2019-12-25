import torrentmac from '../config';
import x from './utils/x-ray';
import Spinner from './utils/spinner';

export default async (url) => {
  const spinner = new Spinner('Get torrent info', 'Get torrent');
  try {
    spinner.start();
    const res = await x(
      url,
      torrentmac.divTorrent,
      torrentmac.torrent,
    );
    res.category = res.category.split(',');
    res.size = `${res.size.split('Size:')[1].split('MB')[0]}Mb`;
    return res;
  } catch (err) {
    return err;
  } finally {
    spinner.stop();
  }
};
