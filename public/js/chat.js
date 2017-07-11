//auto scroll
function scrollToBottom() {
  //Selectors
  var messages = $('#messages');
  
  var newMessage = messages.children('li:last-child');
  //var newMessage = messages.childre
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();//get second to last item

  if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight); //brings it to the bottom of the message area
  }

}

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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  //front end rendering
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });//pass pbjects to

  $('#messages').append(html);//must append object to div
  scrollToBottom();


});

//new location message event handler
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();

  //template to render and data to render into the template
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

//form set up to submit messages
$('#message-form').on('submit', function(event) {
  var messageTextbox = $('[name=message]')
  event.preventDefault();//prevent page refresh default
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {//call back for event acknowledgements
    messageTextbox.val('');//clear value
  });


});


//add location event
var locationButton = $('#send-location');


locationButton.on('click', function(event) {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location');
  });



});
