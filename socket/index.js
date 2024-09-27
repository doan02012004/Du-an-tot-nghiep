const io = require('socket.io')(8000, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connection", (socket) => {
    // thêm người mới truy cập
    // socket.on('addUser', (user) => {
    //     if (user && user._id !== undefined) {
    //         if (!activeUsers.some((item) => user._id === item._id)) {
    //             activeUsers.push({
    //                 ...user,
    //                 socketId: socket.id
    //             })
    //         }
    //     }
    //     io.emit('getUsers', activeUsers)
    // })
    // socket.on("disconnect", () => {
    //     // remove user from active users
    //     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    //     // send all active users to all users
    //     io.emit("getUsers", activeUsers);
    // });
   io.emit('welcome', 'Welcome to the chat')
})




