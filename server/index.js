const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

io.on("connection", (socket) => {

    socket.on('get_rooms', () => {
        const rooms = Array.from(io.sockets.adapter.rooms.entries())
            .filter(([roomName, clients]) =>
                !io.sockets.sockets.has(roomName) && clients.size < 2)  // Exclude individual client rooms and full rooms
            .map(([roomName]) => roomName); // Get only room names

        socket.emit('rooms_list', rooms);
    });

    socket.on('join-room', (room) => {
        let maxRoomSize = 2;
        const clientsInRoom = io.sockets.adapter.rooms.get(room)?.size || 0;
        if (clientsInRoom < maxRoomSize) {
            socket.join(room);
            socket.emit('joined', `You have joined ${room}`);
            console.log(`User ${socket.id} joined ${room}`);
        } else {
            socket.emit('room_full', `The room ${room} is full`);
            console.log(`User ${socket.id} could not join ${room}: Room is full`);
        }
    })
    socket.on('leave-room', (room) => {
        socket.leave(room);
    })

    socket.on("block-click", (obj, room) => {
        console.log(obj);
        console.log(room);
        io.sockets.in(room).emit('receive-click', obj);
    });
    socket.on("restart-click", () => {
        socket.broadcast.emit("restart-game");
    });
    socket.on("update-statistics", (obj) => {
        updateStats(obj);
    })
})

//TODO:Add user stats.
function updateStats(winner) {
    let fs = require('fs');
    const JSON_FILE = "gameStats.json";
    try {

        if (!fileExists(JSON_FILE)) {
            throw new Error("No such File");
        }

        const jsonData = fs.readFileSync(JSON_FILE);

        const stats = JSON.parse(jsonData);

        let data = {};
        stats[`${winner}`]++;
        console.log(stats);

        fs.writeFileSync(JSON_FILE, JSON.stringify(stats, null, '\t'));
    }
    catch (error) {
        console.log("sonething");
        console.error(error);
    }

    // winner == "X" ? file.X++ : file.O++;
    // file[winner]++;
    // fs.writeFile("gameStats.json");
}
function fileExists(filePath) {
    let fs = require('fs');
    return fs.existsSync(filePath);
}