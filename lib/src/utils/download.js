const http = require('https');
const fs = require('fs');
const downloadsFolder = require('downloads-folder');

module.exports = async (url, dest, cb) => {
  dest = `${downloadsFolder()}/${dest}.torrent`;
  const file = fs.createWriteStream(dest);
  http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  })
      .on('error', (err) => {
        fs.unlink(dest);
        if (cb) cb(err.message);
      });
};

