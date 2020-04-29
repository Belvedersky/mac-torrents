import torrentmac from '../config';
import x from './utils/x-ray';
import Spinner from './utils/spinner';

export default async function () {
  const spinner = new Spinner('Loading torrents', 'Get all torrents');
  try {
    spinner.start();
    const res = await x(
      torrentmac.url,
      torrentmac.divList,
      torrentmac.post,
    );
    console.log(res);
    return res;
  } catch (err) {
    return err;
  } finally {
    spinner.stop();
  }
}
