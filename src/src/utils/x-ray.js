import xray from 'x-ray';
import makeDriver from 'request-x-ray';

const x = xray();

const options = {
  method: 'GET',
  jar: true,
  headers: {
    'User-Agent': 'Firefox/48.0',
  },
};
const driver = makeDriver(options);
x.driver(driver);

export default x;
