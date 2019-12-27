/* eslint-disable no-undef */
import config from '../src/config.json';

const data = ['url', 'post', 'torrent', 'category', 'divTorrent', 'divList'];

test(`config has: ${data}`, () => {
  data.map((item) => {
    expect(config).toHaveProperty(item);
    return true;
  });
});
