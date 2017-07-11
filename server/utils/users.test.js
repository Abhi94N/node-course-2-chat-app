const expect = require('expect');
const {Users} = require('./users');


var users;
describe('Users', () => {
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]
  });


  it('should add new users', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Abhi',
      room: 'The Office'
    }
    users.addUser(user.id, user.name, user.room);

    //user was added to users array
    expect(users.users).toEqual([user]);

  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike','Julie']);

  })

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);

  });

  it('should remove a user', () => {
    var OriginalLength = users.users.length;

    var user = users.removeUser('1');

    expect(users.users.length).toBe(OriginalLength - 1);
    expect(user).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    });



  });

  it('should not remove a user', () => {
    var OriginalLength = users.users.length;
    var user = users.removeUser('1231232');
    expect(users.users.length).toBe(OriginalLength);
    expect(user).toNotExist();
    expect(user).toEqual(null);


  });

  it('should find user', () => {
    var user = users.getUser('3');

    expect(user).toEqual(users.users[2]);


  });

  it('should not find user', () => {
    var user = users.getUser('23u9rfdsj');
    
    expect(user).toEqual(null);


  });



});
