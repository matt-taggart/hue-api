const request = require('request-promise');
const fs = require('fs');

const parseIp = function parseIp(response) {
  const ipAddress = JSON.parse(response)[0].internalipaddress;

  return ipAddress;
}

const createUserRequest = function createUserRequest(ip, app) {

  if (!ipAddress) {
    throw new Error('Failure retrieving ip address.');
  }

  let opts = {
    method: 'POST',
    uri: `http://${ip}/api`,
    body: { "devicetype": `${app}` },
    json: true
  }

  return request.post(opts);
}

const parseUserId = function parseUserId(res) {

  if (res && res[0] && res[0].error) {
    throw new Error(`Failure retrieving username: "${res[0].error}"`);
  }

  const userId = res[0].success.username;

  return userId;
}

const saveUsername = function saveUsername(username) {

  if (!username) {
    throw new Error("User id is undefined.");
  }

  return { success: `user ${username} created` };
}

const Hue = {
  init() {
    this.ipAddress = this.getBridgeIp();
  }
  getBridgeIp() {
    return request.get('https://www.meethue.com/api/nupnp');
  },
  createUser(params) {
    let app = params.app;
    let ip = parseIp(this.ipAddress);

    return createUserRequest(ip, app)
      .then(parseUserId)
      .then(saveUsername)
      .catch(error => {
        throw error;
      });

  }
}

module.exports = Object.create(Hue);
