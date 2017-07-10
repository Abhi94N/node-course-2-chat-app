


var socket = io();//intiates request to open up web socket and keep it open

//cannot use Es6 arrow function for client side because of mobile, safari, ie

//built in events
socket.on('connect', function() {
  console.log('Connected to server');

});


socket.on('disconnect',function() {
  console.log('Disconnected to server');
});

//custom events
//object setup in emit function is returned to callback function


socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);

});

//form set up to submit messages
jQuery('#message-form').on('submit', function(event) {
  event.preventDefault();//prevent page refresh default
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {//call back for event acknowledgements
    console.log(data);
  });
  console.log("is this working");
});
