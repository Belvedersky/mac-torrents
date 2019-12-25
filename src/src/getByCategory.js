import Spinner from './utils/spinner';
import torrentmac from '../config';
import x from './utils/x-ray';

export default async (category) => {
  const spinner = new Spinner(
    'Get torrents list',
    `Get torrents by category ${category}`,
  );
  try {
    spinner.start();
    const res = await x(
      `${torrentmac.url}/category/${torrentmac.category[category]}`,
      torrentmac.divList, torrentmac.post,
    );
    return res;
  } catch (err) {
    return err;
  } finally {
    spinner.stop();
  }
};
