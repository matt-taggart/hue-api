const chai = require('chai');
const assert = require('chai').assert;
const chaiAsPromised = require('chai-as-promised');
const Hue = require('./../../index.js');

chai.use(chaiAsPromised);

describe('Testing Hue API', function() {

  let hue;

  before(function() {
    require('dotenv').config({ silent: false });
    hue = Hue({
      ip: process.env.IP,
      username: process.env.USERNAME
    });
  });

  it('Should get all lights', function() {
    return assert.eventually.deepProperty(hue.getLights(), '1.state.on');
  });

  it('Should get light by id', function() {
    return assert.eventually.deepProperty(hue.getLightById(1), 'state.on');
  });

  it('Should turn off all lights', function() {
    return assert.eventually.equal(hue.turnOffAll(), 'All lights successfully turned off.');
  });

  it('Should turn on light with id of 1', function() {
    let expected = [ { success: { '/lights/1/state/on': true } } ];

    return assert.eventually.deepEqual(hue.turnOn(1), expected);
  });

  it('Should set colors of light 1', function() {
    const options = {
      id: 1,
      sat: 254,
      bri: 254,
      hue: 1000
    };

    const expected = [
      { success: { '/lights/1/state/hue': 1000 } },
      { success: { '/lights/1/state/sat': 254 } },
      { success: { '/lights/1/state/bri': 254 } }
    ];

    return assert.eventually.deepEqual(hue.setColor(options), expected);
  });

  it('Should turn off light with id of 1', function() {
    const expected = [ { success: { '/lights/1/state/on': false } } ];

    return assert.eventually.deepEqual(hue.turnOff(1), expected);
  });

  it('Should turn on all lights', function() {
    return assert.eventually.equal(hue.turnOnAll(), 'All lights successfully turned on.');
  });

  it('Should turn set colors of lights 1, 2, and 3', function() {
    const options = {
      id: [1, 2, 3],
      sat: 254,
      bri: 254,
      hue: 50000
    };

    return assert.eventually.deepEqual(hue.setColor(options), 'Successfully changed lights.');
  });

});
