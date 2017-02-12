const request = require('request-promise');

const getLights = function getLights() {

  const url = `http://${this.ip}/api/${this.username}/lights`;

  return request(url)
    .then(JSON.parse)
    .catch(err => {
      throw err;
    });
};

module.exports = getLights;
