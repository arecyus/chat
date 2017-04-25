const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, "../public");
const {generateMessage} = require("./utils/message");
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
        callback("Esto es del servidor");
        // socket.broadcast.emit("newMessage",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on("disconnect",()=>{
        console.log("Desconectado del servidor.");
    })
});


server.listen(port,()=> {
    console.log("Arrancando en port "+port);
});