const request = require('request-promise');

const turnOff = function turnOff(id) {
  let params = {
    method: 'PUT',
    uri: `http://${this.ip}/api/${this.username}/lights/${id}/state`,
    body: { "on": false },
    json: true
  };

  return request(params);
};

module.exports = turnOff;
