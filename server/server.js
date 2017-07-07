const path = require('path');//use path for directory
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //pass in server to use socketIO - returns websocket
//http://localhost:3000/socket.io/socket.io.js access to these functions



app.use(express.static(publicPath));//app to server static folder

//events - responsible for client server relationships
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', (socket) => {
    console.log('Client disconnected from server');
  });
});


//app.listen uses createserver -exact same as app.listen
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



module.exports = {
  app
}
