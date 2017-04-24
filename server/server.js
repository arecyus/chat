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

io.on("connection", (socket)=>{
    console.log("Nuevo usuario");

    socket.on("disconnect",()=>{
        console.log("Desconectado del servidor.");
    })
});


server.listen(port,()=> {
    console.log("Arrancando en port "+port);
});