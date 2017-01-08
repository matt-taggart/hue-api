const request = require('request-promise');

const Hue = {
  config(input) {
    this.ip = input.ip;
    this.username = input.username;
  },
  getLights() {

    const requestLights = () => {
      const url = `http://${this.ip}/api/${this.username}/lights`;

      return request(url);
    }

    const parseResponse = (response) => {
      let lights = JSON.parse(response);

      return lights;
    }


    return requestLights()
      .then(parseResponse)
      .catch(err => {
        throw err;
      });

  }
}

module.exports = Object.create(Hue);
