const http = require('http');

const URL = 'https://perfume-bot.herokuapp.com/'; // 独自ドメインでもOK
const INTERVAL_MSEC = 10 * 60 * 1000; // 10分毎(30分未満ならOK)

setInterval(() => {
  http
    .get(URL, res => {
      console.log(res, URL);
    })
    .on('error', err => {
      console.log(err, URL);
    });
}, INTERVAL_MSEC);
