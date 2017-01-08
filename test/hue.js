const assert = require('chai').assert;

describe('Testing Hue API', function() {

  before(function() {
    require('dotenv').config({ silent: false });
  });

  it('Should get all lights', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.getLights()
      .then(results => {
        assert.property(results, '1');
        assert.deepProperty(results, '1.state');
        assert.deepProperty(results, '1.state.on');
        done();
      });

  });

  it('Should get light by id', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.getLightById(1)
      .then(results => {
        assert.property(results, 'state');
        assert.deepProperty(results, 'state.on');
        done();
      });
  });

  it('Should turn on light with id of 1', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.turnOn(1)
      .then(results => {
        let expected = [ { success: { '/lights/1/state/on': true } } ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should turn off light with id of 1', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.turnOff(1)
      .then(results => {
        let expected = [ { success: { '/lights/1/state/on': false } } ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should set colors of light 1', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    let options = {
      id: 1,
      sat: 254,
      bri: 254,
      hue: 50000
    };

    return Hue.setColor(options)
      .then(results => {
        console.log(results);
        let expected = [
          { success: { '/lights/1/state/hue': 50000 } },
          { success: { '/lights/1/state/sat': 254 } },
          { success: { '/lights/1/state/bri': 254 } }
        ];

        assert.deepEqual(results, expected);
        done();
      });
  });

  it('Should turn set colors of lights 1, 2, and 3', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    let options = {
      id: [1, 2, 3],
      sat: 254,
      bri: 254,
      hue: 50000
    };

    return Hue.setColor(options)
      .then(result => {
        assert.equal(result, 'Successfully changed lights.');
        done();
      });
  });

  it('Should turn off all lights', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.turnOffAll()
      .then(result => {
        assert.equal(result, 'All lights successfully turned off.');
        done();
      });
  });

  it('Should turn on all lights', function(done) {
    let Hue = require('./../index.js');

    Hue.config({
      ip: process.env.IP_ADDRESS,
      username: process.env.USERNAME
    });

    return Hue.turnOnAll()
      .then(result => {
        assert.equal(result, 'All lights successfully turned on.');
        done();
      });
  });

});
