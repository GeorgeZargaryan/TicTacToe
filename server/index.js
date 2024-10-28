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
        
        fs.writeFileSync(JSON_FILE, JSON.stringify(stats,null, '\t'));
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