require('dotenv').config({ silent: false });
const Hue = require('./index.js');

Hue.config({
  ip: process.env.IP,
  username: process.env.USERNAME
});

let count = 0;

let display = setInterval(function() {
  let random = Math.floor(Math.random() * 65535);

  if (count < 10) {
    Hue.setColor({
      id: [1, 2, 3],
      sat: 254,
      bri: 254,
      hue: random
    });
  } else {
    clearInterval(display);
  }

  count++;

}, 3000);
