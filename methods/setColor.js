const request = require('request-promise');

const setColor = function setColor(args) {
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
};

module.exports = setColor;
