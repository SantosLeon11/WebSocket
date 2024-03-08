var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
    id:1, text:"Hola soy un mensaje",author:"DelosSantos"
}];

app.use(express.static('public'))
app.get('/',function(req,res){
    res.status(200).send("Hola mundo")
});

io.on('connection', function(socket){
    console.log("Alguien se ha conectado con socket")
    socket.emit('mensajes',mensajes)

    socket.on('nuevomensaje',function(data){
        mensajes.push(data);

        io.sockets.emit('mensajes',mensajes);
    })
});



server.listen(8080,function(){
    console.log('Servidor corriendo en http://localhost:8080');
});

