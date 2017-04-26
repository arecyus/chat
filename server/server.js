const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, "../public");
const {generateMessage} = require("./utils/message");
const {generateLocationMessage} = require("./utils/message");
const app = express();
const port= process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("Nuevo usuario");


    socket.emit("newMessage",generateMessage("Admin","Bienvenido al chat"));

    socket.broadcast.emit("newMessage",generateMessage("Admin","Se conecto un nuevo usuario"));


    socket.on("createMessage",(message,callback)=>{
        console.log("CreateMessage",message);
        io.emit("newMessage", generateMessage(message.from,message.text));
        callback();

    });

    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });

    socket.on("disconnect",()=>{
        console.log("Desconectado del servidor.");
    })
});


server.listen(port,()=> {
    console.log("Arrancando en port "+port);
});