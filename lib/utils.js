const http = require('https');
const fs = require('fs');
const downloadsFolder = require('downloads-folder');
const childProcess = require('child_process');

exports.download = (url, dest, cb) => {
  dest = `${downloadsFolder()}/${dest}.torrent`;
  const file = fs.createWriteStream(dest);
  http
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', function() {
          file.close(cb);
        });
      })
      .on('error', (err) => {
        // Handle errors
        fs.unlink(dest);
        if (cb) cb(err.message);
      });
};
// eslint-disable-next-line max-len
// open file.torrent -a "Transmission"
exports.open = (dir) =>{
  dir = `${downloadsFolder()}/${dir}.torrent`;
  childProcess.exec('open ' + dir, function(
      err,
      stdout,
      stderr,
  ) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    process.exit(0);
  });
};
