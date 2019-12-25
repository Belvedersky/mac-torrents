/* global test, expect */
import config from '../src/config';

const data = ['url', 'post', 'torrent', 'category', 'divTorrent', 'divList'];

test(`config has: ${data}`, () => {
  data.map((item) => {
    expect(config).toHaveProperty(item);
    return true;
  });
});
