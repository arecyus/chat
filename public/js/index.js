var socket = io();

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function(){
    console.log("Desconectado del servidor");
});

socket.on("newMessage",function(message){
    console.log("Nuevo mensaje",message);
    var li = $("<li></li>");
    li.text(message.from+": "+message.text);

    $("#messages").append(li);
});

socket.on("newLocationMessage", function (message) {
    var li = $("<li></li>");
    var a = $('<a target="_blank">Mi posicion</a>');

    li.text(message.from+": ");
    a.attr("href", message.url);
    console.log(message.url);
    console.log(message.from);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit",function (e) {
    e.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: $("[name=message]").val()
    },function () {

    })
});

var locationButton =$("#send-location");

locationButton.on("click",function(){
   if(!navigator.geolocation){
       return alert("No esta disponible en tu navegador");
   }

   navigator.geolocation.getCurrentPosition(function(position){
      socket.emit("createLocationMessage",{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      });
   },function(){
       alert("No se pudo encontrar tu ubicacion");
   });
});