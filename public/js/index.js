var socket = io();

function scrollToBottom () {
  var messages = $("#messages");
  var newMessage = messages.children("li:last-child");
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight+scrollTop + newMessageHeight + lastMessageHeight>=scrollHeight){
      messages.scrollTop(scrollHeight);
  }
};

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnect", function(){
    console.log("Desconectado del servidor");
});

socket.on("newMessage",function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template,{
        text:message.text,
        from: message.from,
        createdAt:formattedTime
    });

    $("#messages").append(html);

    scrollToBottom();
    // console.log("Nuevo mensaje",message);
    // var li = $("<li></li>");
    // li.text(message.from+" "+formattedTime+" :"+ message.text);
    //
    // $("#messages").append(li);

});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $("#location-message-template").html();
    var html = Mustache.render(template,{
       url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
    // var li = $("<li></li>");
    // var a = $('<a target="_blank">Mi posicion</a>');
    //
    // li.text(message.from+" "+formattedTime+": ");
    // a.attr("href", message.url);
    // console.log(message.url);
    // console.log(message.from);
    // li.append(a);
    // $("#messages").append(li);
});

$("#message-form").on("submit",function (e) {
    e.preventDefault();
    var messageTextBox = $("[name=message]");
    socket.emit("createMessage", {
        from: "User",
        text: messageTextBox.val()
    },function () {
        messageTextBox.val("");
    });
});

var locationButton =$("#send-location");

locationButton.on("click",function(){
   if(!navigator.geolocation){
       return alert("No esta disponible en tu navegador");
   }

   locationButton.attr("disabled","disabled").text("Enviando posicion...");

   navigator.geolocation.getCurrentPosition(function(position){
       locationButton.removeAttr("disabled").text("enviar posicion");
      socket.emit("createLocationMessage",{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      });
   },function(){
       locationButton.removeAttr("disabled").text("enviar posicion");
       alert("No se pudo encontrar tu ubicacion");
   });
});