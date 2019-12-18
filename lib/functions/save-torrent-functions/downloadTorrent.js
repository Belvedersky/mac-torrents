const http = require('https');
const fs = require('fs');
const downloadsFolder = require('downloads-folder');

function download(url, dest, cb) {
  dest = `${downloadsFolder()}/${dest}.torrent`;
  const file = fs.createWriteStream(dest);
  http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', function () {
      file.close(cb);
    });
  })
    .on('error', (err) => {
      // Handle errors
      fs.unlink(dest);
      if (cb) cb(err.message);
    });
};

module.exports = download;