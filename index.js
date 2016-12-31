const request = require('request-promise');

const Methods = {
  getBridgeIp() {
    return request.get('https://www.meethue.com/api/nupnp');
  },
  createUser() {
    const getBridgeIp = this.getBridgeIp();

    const parseIp = function parseIp(response) {
      const ipAddress = JSON.parse(response)[0].internaliaddress;

      return ipAddress;
    }

    const createUserRequest = function createUserRequest(ipAddress) {

      if (!ipAddress) {
        throw new Error('Could not retrieve ip address.');
      }

      let opts = {
        method: 'POST',
        uri: `http://${ipAddress}/api`,
        body: { "devicetype": "myHueApp" },
        json: true
      }

      return request.post(opts);
    }

    const parseUserId = function parseUserId(response) {
      const userId = JSON.parse(response);

      return userId;
    }

    const saveUserId = function saveUserId(id) {

      if (!id) {
        throw new Error("Customer id is undefined.");
      }

      return id;
    }


    return getBridgeIp
      .then(parseIp)
      .then(createUserRequest)
      .then(parseUserId)
      .then(saveUserId)
      .catch(error => {
        throw error;
      });
  },
  saveUser() {

  }
}

const Hue = Object.create(Methods);

module.exports = Hue;
