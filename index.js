const request = require('request-promise');

const Hue = {
  config(input) {
    this.ip = input.ip;
    this.username = input.username;
  },
  getLights() {

    let params = {
      method: 'POST',
      uri: `http://${ipAddress}/api/${userId}`,
      body: { "devicetype": `${app}` },
      json: true
    }

    return request.post(params)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        throw error;
      });
  }
}

module.exports = Object.create(Hue);
