const getLights = require('./methods/getLights.js'),
      getLightById = require('./methods/getLightById.js'),
      turnOn = require('./methods/turnOn.js'),
      turnOnAll = require('./methods/turnOnAll.js'),
      turnOff = require('./methods/turnOff.js'),
      turnOffAll = require('./methods/turnOffAll.js'),
      setColor = require('./methods/setColor.js');

const HueProto = {
  getLights,
  getLightById,
  turnOn,
  turnOnAll,
  turnOff,
  turnOffAll,
  setColor
};

module.exports = function Hue(input) {
  return Object.assign(Object.create(HueProto), {
    ip: input.ip,
    username: input.username
  });
};
