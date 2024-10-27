const express = require("express");
const app = express();
const path = require("path");
// as http is to upgraded to web-socket , direct app.listen is not possible is using express
const http = require("http");
// app is passed inside the http server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); // upgrades the server

// Socket.io
io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));





