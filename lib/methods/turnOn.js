const request = require('request-promise');

const turnOn = function turnOn(id) {
  if (!id) {
    throw new Error("Must provide light id as an argument.");
  }

  let params = {
    method: 'PUT',
    uri: `http://${this.ip}/api/${this.username}/lights/${id}/state`,
    body: { "on": true },
    json: true
  };

  return request(params);
};

module.exports = turnOn;
