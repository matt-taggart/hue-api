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
    };

    const parseResponse = (response) => {
      let lights = JSON.parse(response);

      return lights;
    };

    return requestLights()
      .then(parseResponse)
      .catch(err => {
        throw err;
      });

  },
  getLightById(id) {

    const requestLight = (id) => {
      const url = `http://${this.ip}/api/${this.username}/lights/${id}`;

      return request.get(url);
    };

    const parseResponse = (response) => {
      let lights = JSON.parse(response);

      return lights;
    };

    return requestLight(id)
      .then(parseResponse)
      .catch(err => {
        throw err;
      });
  },
  turnOn(id) {

    let params = {
      method: 'PUT',
      uri: `http://${this.ip}/api/${this.username}/lights/${id}/state`,
      body: { "on": true },
      json: true
    };

    return request(params);
  },
  turnOff(id) {

    let params = {
      method: 'PUT',
      uri: `http://${this.ip}/api/${this.username}/lights/${id}/state`,
      body: { "on": false },
      json: true
    };

    return request(params);
  },
  // action(args) {
  //
  //   let params = {
  //     method: 'POST',
  //     uri: `http://${ip}/api`,
  //     body: { "devicetype": `${app}` },
  //     json: true
  //   };
  //
  // }

}

module.exports = Object.create(Hue);
