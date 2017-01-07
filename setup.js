const fs = require('fs');
const app = process.argv[2];

const getBridgeIp = function getBridgeIp() {
  return request.get('https://www.meethue.com/api/nupnp');
};

const parseIp = function parseIp(response) {
  const ip = JSON.parse(response)[0].internalipaddress;

  return ip;
};

const createUserRequest = function createUserRequest(ip, app) {

  if (!ip) {
    throw new Error('Failure retrieving ip address.');
  }

  const entry = `IP=${ip}`

  fs.appendFile('.env', entry, (err) => {
    if (err) throw err;
    console.log('IP saved!');
  });

  let params = {
    method: 'POST',
    uri: `http://${ip}/api`,
    body: { "devicetype": `${app}` },
    json: true
  };

  return request.post(params);
};

const parseUserId = function parseUserId(res) {

  if (res && res[0] && res[0].error) {
    throw new Error(`Failure retrieving username: "${res[0].error}"`);
  }

  const userId = res[0].success.username;

  return userId;
};

const saveUsername = function saveUsername(username) {

  if (!username) {
    throw new Error("User id is undefined.");
  }

  const entry = `USERNAME=${username}`;

  fs.appendFile('.env', entry, (err) => {
    if (err) throw err;
    console.log('Username saved!');
  });
};

getBridgeIp()
  .then(parseIp)
  .then(createUserRequest)
  .then(parseUserId)
  .then(saveUsername)
  .catch(err => {
    throw err;
  });
