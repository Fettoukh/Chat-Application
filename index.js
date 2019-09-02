var express = require('express')
var socket  = require('socket.io')
// APP setup
var app = express();
var server = app.listen(4000);

//Static files
app.use(express.static('public'));
console.log("192 168 137 1 : 4000")
//Socket setup
// socket takes a server as a parameter
var io = socket(server);

io.on('connection',function(socket){
  console.log("Made socket connexion", socket.id)
  socket.on('chat',function(data){
    console.log(data);
    io.sockets.emit('chat',data);
  });
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data)
  })

});
