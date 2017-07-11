const path = require('path');//use path for directory
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //pass in server to use socketIO - returns websocket
//http://localhost:3000/socket.io/socket.io.js access to these functions



app.use(express.static(publicPath));//app to server static folder

//events - responsible for client server relationships
io.on('connection', (socket) => {
  console.log('New user connected');

  //socket.emit from Admin text welcome to the chat app to individual connected client
  socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));
  //socket.broadcast.emit from Admin text so other clients know that new user has joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));




  socket.on('disconnect', (socket) => {
    console.log('Client disconnected from server');
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    //creates an event name of event and pass data
    io.emit('newMessage',  generateMessage(message.from, message.text)); //broadcasts message to every single connection
    callback(); //going to make call back when connection has been made
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });






});


//app.listen uses createserver -exact same as app.listen
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



module.exports = {
  app
}
