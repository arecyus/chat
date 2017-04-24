var socket = io();

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function(){
    console.log("Desconectado del servidor");
});

socket.on("newMessage",function(message){
    console.log("Nuevo mensaje",message);
});