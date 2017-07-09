var expect = require('expect');
var {generateMessage} = require('./message');
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
})
