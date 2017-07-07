var socket = io();//intiates request to open up web socket and keep it open

//cannot use Es6 arrow function for client side because of mobile, safari, ie

//built in events
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'aksfkskfs@gmail.com',
    text: 'Hi'
  });


socket.on('disconnect',function() {
  console.log('Disconnected to server');
});



//custom events
//object setup in emit function is returned to callback function


socket.on('newMessage', function (message) {
  console.log('New message', message);
});


});
