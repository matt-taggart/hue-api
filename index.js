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
  turnOnAll() {
    const getLights = this.getLights.bind(this);
    const turnOn = this.turnOn.bind(this);

    const turnOnAll = (response) => {
      const lights = Object.keys(response);

      const executeAll = lights.reduce((prev, next, key, arr) => {
        return prev.then(turnOn(arr[key]));
      }, Promise.resolve());

      return executeAll;
    };

    const success = () => {
      return 'All lights successfully turned on.';
    };

    return getLights()
      .then(turnOnAll)
      .then(success)
      .catch(err => {
        throw err;
      });
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
  turnOffAll() {
    const getLights = this.getLights.bind(this);
    const turnOff = this.turnOff.bind(this);

    const turnOffAll = (response) => {
      const lights = Object.keys(response);

      const executeAll = lights.reduce((prev, next, key, arr) => {
        return prev.then(turnOff(arr[key]));
      }, Promise.resolve());

      return executeAll;
    };

    const success = () => {
      return 'All lights successfully turned off.';
    };

    return getLights()
      .then(turnOffAll)
      .then(success)
      .catch(err => {
        throw err;
      });
  },
  setColor(args) {
    let id = args.id;

    if (!id) {
      throw new Error("Must provide light id(s) as an argument.");
    }

    if (Array.isArray(id)) {
      let lights = id;
      let params;

      const executeAll = lights.reduce((prev, next, key, arr) => {

        params = {
          method: 'PUT',
          uri: `http://${this.ip}/api/${this.username}/lights/${arr[key]}/state`,
          body: {
            "sat": args.sat,
            "bri": args.bri,
            "hue": args.hue
          },
          json: true
        };

        return prev.then(request(params));
      }, Promise.resolve());

      const success = () => {
        return 'Successfully changed lights.';
      };

      return executeAll
        .then(success)
        .catch(err => {
          throw err;
        });

    } else {

      let params = {
        method: 'PUT',
        uri: `http://${this.ip}/api/${this.username}/lights/${id}/state`,
        body: {
          "sat": args.sat,
          "bri": args.bri,
          "hue": args.hue
        },
        json: true
      };

      return request(params);
    }
  }
};

module.exports = Object.create(Hue);
