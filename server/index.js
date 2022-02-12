const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    socket.on("start_chat", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} started chat with user: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.receiver).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Server is running");
});