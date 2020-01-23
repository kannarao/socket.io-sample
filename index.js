var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users = []
var chat = io.of('chat')
chat.on('connection', function(socket){
  console.log('a user connected', socket.id);
  users.push(socket.id);

  //socket.broadcast.emit('hi');
  socket.on('disconnect', function(){
  	let index = users.indexOf(socket.id)
  	console.log("disconnect", socket.id, index)
  	console.log("users", users);
  	users.splice(index,1);
  });
});

app.get('/chat', function(req, res){
  users.forEach(id => chat.emit('chat', 'chating2'));	
  res.send("success");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
