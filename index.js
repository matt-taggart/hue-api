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

      if (!ipAddress) {
        throw new Error('Failure retrieving ip address.');
      }

      let opts = {
        method: 'POST',
        uri: `http://${ipAddress}/api`,
        body: { "devicetype": "myHueApp" },
        json: true
      }

      return request.post(opts);
    }

    const parseUserId = function parseUserId(res) {

      if (res && res[0] && res[0].error) {
        throw new Error('Failure retrieving username.');
      }

      return userId;
    }

    const saveUsername = function saveUsername(username) {

      if (!username) {
        throw new Error("User id is undefined.");
      }

      process.env.USERNAME = username;

      return { success: `user ${username} successfully created`};
    }


    return getBridgeIp
      .then(parseIp)
      .then(createUserRequest)
      .then(parseUserId)
      .then(saveUsername)
      .catch(error => {
        throw error;
      });
  },
  saveUser() {

  }
}

const Hue = Object.create(Methods);

module.exports = Hue;
