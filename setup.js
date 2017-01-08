const request = require('request-promise'),
      fs = require('fs-promise'),
      app = process.argv[2];

if (!app) {
  throw new Error("Must provide app name as command line argument.");
}

const getBridgeIp = function getBridgeIp  () {
  return request.get('https://www.meethue.com/api/nupnp');
};

const parseIp = function parseIp(response) {
  const ip = JSON.parse(response)[0].internalipaddress;

  return ip;
};

const createUserRequest = function createUserRequest(ip) {

  if (!ip) {
    throw new Error('Failure retrieving ip address.');
  }

  let params = {
    method: 'POST',
    uri: `http://${ip}/api`,
    body: { "devicetype": `${app}` },
    json: true
  };

  return Promise.all([ request(params), ip ]);
};

const parseUsername = function parseUserId(res) {
  let response = res[0],
      ip = res[1];

  if (response && response[0] && response[0].error) {
    throw new Error(`Failure retrieving username. Please press the button on the bridge and try again.`);
  }

  const username = response[0].success.username;

  return { username, ip };
};

const saveInfo = function saveInfo(results) {

  let username = results.username,
      ip = results.ip;

  if (!username) {
    throw new Error("User id is undefined.");
  }

  let entry = `IP=${ip}\n` +
              `USERNAME=${username}`;

  return Promise.all([ fs.writeFile('.env', entry), username, ip ]);
};

const success = function success(results) {
  let username = results[1],
      ip = results[2];

  console.log(`Successfully created .env file with username ${username} and ip address ${ip}.`);
};

getBridgeIp()
  .then(parseIp)
  .then(createUserRequest)
  .then(parseUsername)
  .then(saveInfo)
  .then(success)
  .catch(err => {
    throw err;
  });
