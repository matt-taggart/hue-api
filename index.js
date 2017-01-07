const request = require('request-promise');


const Hue = {
  config(input) {
    this.ip = input.ip;
    this.username = input.username;
  },
  getLights() {
    const url = `http://${this.ip}/api/${this.username}/lights`;

    return request(url);
  },

}

module.exports = Object.create(Hue);
