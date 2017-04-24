const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, "../public");

const app = express();
const port= process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("Nuevo usuario");

    socket.emit("newMessage",{
        from:"ejemplo@hola.com",
        text:"Hola, como va",
        createdAt: 1234
    });

    socket.on("createMessage",(newMessage)=>{
        console.log("CreateMessage",newMessage);
    });

    socket.on("disconnect",()=>{
        console.log("Desconectado del servidor.");
    })
});


server.listen(port,()=> {
    console.log("Arrancando en port "+port);
});