const request = require('request-promise');

const turnOnAll = function turnOnAll() {
  const getLights = this.getLights.bind(this);
  const turnOn = this.turnOn.bind(this);

  const executeAll = function executeAll(response) {
    const lights = Object.keys(response);

    return lights
      .map((current, key, arr) => {
        return turnOn(arr[key]);
      })
      .reduce((prev, next) => {
        return prev.then(() => {
          return next;
        });
      }, Promise.resolve());
  };

  const success = () => {
    return 'All lights successfully turned on.';
  };

  return getLights()
    .then(executeAll)
    .then(success)
    .catch(err => {
      throw err;
    });
};

module.exports = turnOnAll;
