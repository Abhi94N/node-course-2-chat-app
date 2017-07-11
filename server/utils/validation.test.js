var expect = require('expect');
var {isRealString} = require('./validation');




describe('isRealString', () =>{
  it('should reject non-string values', () =>{
    var user = {name: 2, room: true};
    expect(isRealString(user.name)).toBe(false);
    expect(isRealString(user.room)).toBe(false);

  });

  it('should reject string with only spaces', () => {
    var user = {name: ' ', room: '      '};
    expect(isRealString(user.name)).toBe(false);
    expect(isRealString(user.room)).toBe(false);
  });

  it('should allow string with non space characters', () => {
    var user = {name: 'Abhilash', room: 'my room'};

    expect(isRealString(user.name)).toBe(true);
    expect(isRealString(user.room)).toBe(true)
  });
})
