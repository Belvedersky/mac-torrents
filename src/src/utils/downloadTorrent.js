import { get } from 'https';
import { createWriteStream, unlink } from 'fs';
import downloadsFolder from 'downloads-folder';

export default (url, dest, cb) => {
  const path = `${downloadsFolder()}/${dest}.torrent`;
  const file = createWriteStream(path);
  get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  }).on('error', (err) => {
    unlink(path);
    if (cb) cb(err.message);
  });
};
