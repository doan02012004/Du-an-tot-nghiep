const io = require('socket.io')(8000, {
    cors: {
        origin: "http://localhost:5173"
    }
})
let activeUsers = []
io.on("connection", (socket) => {
    // thêm người mới truy cập
    socket.on('addUser', (user) => {
        if (user && user._id !== undefined) {
            if (!activeUsers.some((item) => user._id === item._id)) {
                activeUsers.push({
                    ...user,
                    socketId: socket.id
                })
               
            }
        }
        io.emit('getUsers', activeUsers)
    })
    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        // send all active users to all users
        io.emit("getUsers", activeUsers);
    });
    socket.on("createChat",(newChat) =>{
        const admin = activeUsers.find((user) => user.role === "admin")
        if(admin){
            io.to(admin.socketId).emit("newChat",newChat)
        }

    })
    socket.on("sendMessage",(newMessage) =>{
        const user = activeUsers.find((user) => user._id == newMessage.receiver)
        if(user){
            io.to(user.socketId).emit("newMessage",newMessage)
        }
    })
  
//    io.emit('welcome', 'Welcome to the chat')
    // update product price theo time
    socket.on("adminUpdatePrice",(option)=>{
        // Phát sự kiện 'updateAttributeProduct' đến tất cả các client đang kết nối
        io.emit('adminUpdateProduct',option)
    })
})




