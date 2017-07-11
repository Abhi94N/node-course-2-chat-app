var moment = require('moment');

var date = moment();//get current point in time

console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();//same as new Date().getTime()
console.log(someTimestamp);
