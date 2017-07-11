var moment = require('moment');

var generateMessage = (from, text) => {
  return {from,
        text,
        createdAt: moment().valueOf()
  }
};

var generateLocationMessage = (from, latitiude, longitude) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${latitiude},${longitude}`,
    createdAt:  moment().valueOf()
  }
}

module.exports = {generateMessage, generateLocationMessage};
