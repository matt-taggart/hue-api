const request = require('request-promise');

const turnOffAll = function() {
  const getLights = this.getLights.bind(this);
  const turnOff = this.turnOff.bind(this);

  const executeAll = function executeAll(response) {
    const lights = Object.keys(response);

    return lights.reduce((prev, next, key, arr) => {
      return prev.then(turnOff(arr[key]));
    }, Promise.resolve());
  };

  const success = () => {
    return 'All lights successfully turned off.';
  };

  return getLights()
    .then(executeAll)
    .then(success)
    .catch(err => {
      throw err;
    });
};

module.exports = turnOffAll;
