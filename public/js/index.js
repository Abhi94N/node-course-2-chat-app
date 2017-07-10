


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


//posting a new message
socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);

});

//new location message event handler
socket.on('newLocationMessage', function (message) {
  console.log('New message', message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

//form set up to submit messages
$('#message-form').on('submit', function(event) {
  event.preventDefault();//prevent page refresh default
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data) {//call back for event acknowledgements
    //console.log(data);
  });


});

console.log(navigator);
//add location event
var locationButton = $('#send-location');


locationButton.on('click', function(event) {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location.');
  });



});
