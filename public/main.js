var socket = io.connect('http://localhost:8080',{'forceNew':true});

socket.on('mensajes',function(data){
    console.log(data);
    render(data)
})

function render(data){
    var html = data.map(function(elem, index){
        return(`<div><strong>${elem.author}</strong>:<em>${elem.text}</em></div>`);
    }).join(" ");
    
    document.getElementById('mensajes').innerHTML=html;
}

function addMessage(e){
    var payload = {
        author:document.getElementById('username').value,
        text:document.getElementById('texto').value
    };
    socket.emit('nuevomensaje',payload);
    return false;
}