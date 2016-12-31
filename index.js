const request = require('request-promise');

const Methods = {
  getBridgeIp() {
    return request.get('https://www.meethue.com/api/nupnp');
  },
  createUser() {
    const getBridgeIp = this.getBridgeIp();

    const parseIp = function parseIp(response) {
      const ipAddress = JSON.parse(response)[0].internalipaddress;

      return ipAddress;
    }

    const createUserRequest = function createUserRequest(ipAddress) {
      let opts = {
        method: 'POST',
        uri: `http://${ipAddress}/api`,
        body: { "devicetype": "myHueApp" },
        json: true
      }

      return request.post(opts);
    }

    return getBridgeIp
      .then(parseIp)
      .then(createUserRequest)
      .catch(error => {
        throw error;
      });
  }
}

const Hue = Object.create(Methods);

module.exports = Hue;
