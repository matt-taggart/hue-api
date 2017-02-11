const assert = require('chai').assert;
const Hue = require('./../index.js');

describe('Testing Hue API', function() {

  let hue;

  before(function() {
    require('dotenv').config({ silent: false });
  });

  beforeEach(function() {
    hue = Hue({
      ip: process.env.IP,
      username: process.env.USERNAME
    });
  });

  it('Should get all lights', function(done) {
    return hue.getLights()
      .then(results => {
        assert.property(results, '1');
        assert.deepProperty(results, '1.state');
        assert.deepProperty(results, '1.state.on');
        done();
      });
  });

  it('Should get light by id', function(done) {
    return hue.getLightById(1)
      .then(results => {
        assert.property(results, 'state');
        assert.deepProperty(results, 'state.on');
        done();
      });
  });

  it('Should turn on light with id of 1', function(done) {
    return hue.turnOn(1)
      .then(results => {
        let expected = [ { success: { '/lights/1/state/on': true } } ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should set colors of light 1', function(done) {
    let options = {
      id: 1,
      sat: 254,
      bri: 254,
      hue: 1000
    };

    return hue.setColor(options)
      .then(results => {
        let expected = [
          { success: { '/lights/1/state/hue': 1000 } },
          { success: { '/lights/1/state/sat': 254 } },
          { success: { '/lights/1/state/bri': 254 } }
        ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should turn off light with id of 1', function(done) {
    return hue.turnOff(1)
      .then(results => {
        let expected = [ { success: { '/lights/1/state/on': false } } ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should turn set colors of lights 1, 2, and 3', function(done) {
    let options = {
      id: [1, 2, 3],
      sat: 254,
      bri: 254,
      hue: 50000
    };

    return hue.setColor(options)
      .then(result => {
        assert.equal(result, 'Successfully changed lights.');
        done();
      });
  });

  it('Should turn off all lights', function(done) {
    return hue.turnOffAll()
      .then(result => {
        assert.equal(result, 'All lights successfully turned off.');
        done();
      });
  });

  it('Should turn on all lights', function(done) {
    return hue.turnOnAll()
      .then(result => {
        assert.equal(result, 'All lights successfully turned on.');
        done();
      });
  });

});
