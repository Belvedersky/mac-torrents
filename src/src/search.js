import { isEmpty } from 'lodash';
import Spinner from './utils/spinner';
import config from '../config';
import x from './utils/x-ray';

export default async (name) => {
  const spinner = new Spinner(`Search torrents by name: ${name}`);
  try {
    spinner.start();
    const res = await x(`${config.url}/?s=${name}`,
      config.divList,
      config.post);

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
