var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () => {

  it('it should generate the correct message object', () => {
    var text = "Hi how are you!"
    var from = "Abhilash"
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});


describe('generateLocationMessage', () => {
  it('should generate the correct location object', () =>{
      var from = 'Admin';
      var latitude ='33.8686337';
      var longitude = '-84.4705602';
      var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      var locationMessage = generateLocationMessage('Admin',latitude,
            longitude);
      expect(locationMessage).toInclude({from, url});
      expect(locationMessage.from).toBe(from);
      expect(locationMessage.createdAt).toBeA('number');
      



  });

});
