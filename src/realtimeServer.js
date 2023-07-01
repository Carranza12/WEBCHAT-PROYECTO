const { _createDocument } = require("./services/firebase.service")
module.exports = httpServer => {
    const { Server } = require("socket.io");
    const io = new Server(httpServer);

    io.on("connect", socket => {
        socket.on("message", async message => {
            await _createDocument('general_chat', message);
            io.emit("message", message );
        })

        socket.on("user connected", user => {
            socket.broadcast.emit("user join", `${user} se ha unido al chat.` );
        } )   
    })
}