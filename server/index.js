const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("block-click", (obj) => {
        console.log(obj);
        socket.broadcast.emit('receive-click', obj);
    })
    socket.on("restart-click", () => {
        socket.broadcast.emit("restart-game");
    })
})
