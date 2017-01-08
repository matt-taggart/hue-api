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

});
