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



$("#message-form").on("submit",function (e) {
    e.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: $("[name=message]").val()
    },function () {

    })
});

