require('dotenv').config({ silent: false });
const Hue = require('./index.js');

Hue.config({
  ip: process.env.IP,
  username: process.env.USERNAME
});

setInterval(function() {
  let random = Math.floor(Math.random() * 65535);

  Hue.setColor({
    id: [1, 2, 3],
    sat: 254,
    bri: 254,
    hue: random
  });

}, 3000);
