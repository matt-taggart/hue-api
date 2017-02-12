const request = require('request-promise');

const getLightById = function getLightById(id) {

  const url = `http://${this.ip}/api/${this.username}/lights/${id}`;

  return request.get(url)
    .then(JSON.parse)
    .catch(err => {
      throw err;
    });
};

module.exports = getLightById;
