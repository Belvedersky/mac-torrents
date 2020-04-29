/* eslint-disable no-undef */
// import config from '../dist/config';
const config = {
  url: 'https://www.torrentmac.net',
  divList: 'article.post',
  post: [
    {
      title: 'h2 a',
      link: 'h2 a@href',
      image: 'img@src',
      date: 'time',
      category: 'span',
      description: 'section.post_content',
    },
  ],
  divTorrent: '#main',
  torrent: {
    title: '.appdesc',
    time: 'time',
    category: 'span',
    size: 'table.torrentInfoTable',
    file: 'a.download-btn@href',
    description: 'section.post_content p',
  },
  category: {
    Video: 'application/video',
    'Graphics & Design': 'application/graphics-design',
    Photography: 'application/photography',
    Productivity: 'application/productivity',
    Utilities: 'application/utilities',
    Music: 'application/music',
    Office: 'application/office',
    Adobe: 'application/adobe',
    Games: 'games',
  },
};

const data = ['url', 'post', 'torrent', 'category', 'divTorrent', 'divList'];

test(`config has: ${data}`, () => {
  data.map((item) => {
    expect(config).toHaveProperty(item);
    return true;
  });
});
