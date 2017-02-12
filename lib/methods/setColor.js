const request = require('request-promise');
const errorHandler = require('./../utils/errorHandler.js');

const setColor = function setColor(args) {
  let id = args.id;

  if (!id) {
    throw new Error("Must provide light id(s) as an argument.");
  }

  if (Array.isArray(id)) {
    let lights = id;
    let params;

    const setAll = () => {
      return lights
        .map((current, key, arr) => {
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

            return request(params);
        })
        .reduce((prev, next) => {
          return prev.then(() => {
            return next;
          }).then(errorHandler);
        });
    };

    const success = () => {
      return 'Successfully changed lights.';
    };

    return setAll()
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
