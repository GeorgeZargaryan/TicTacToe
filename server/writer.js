function updateStats(stats) {
    let fs = require('fs');
    fs.readFile("gameStats.json", (err, data) => {
        console.log(`Error: ${err}`);
        console.log(`Data: ${data}`);
    });
}

module.exports = { updateStats };