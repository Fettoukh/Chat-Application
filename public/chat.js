//Make connection

var socket = io.connect()

//Query DOM
var message= document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn    = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback=document.getElementById('feedback');

//Emit Events
btn.addEventListener('click',function(){
  socket.emit('chat',{
    message:message.value,
    handle :handle.value,
  });
  message.value='';
})

message.addEventListener('keypress',function(){
  socket.emit('typing',{
    handle:handle.value,
  })
})


//Listen for Events
socket.on('chat',function(data){
  feedback.innerHTML ='';

  output.innerHTML+= '<p><strong>'+data.handle+': </strong>'+data.message+'</p>'

  var chatWindow= document.getElementById('chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;

});

socket.on('typing',function(data){
  setTimeout(function(){
    feedback.innerHTML='';
  },5000)
  feedback.innerHTML = "<p> <em>"+data.handle+" is typing a message...</em></p>";


})
