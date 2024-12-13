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


    // Tạo hộp thoại mới
    socket.on("createChat", (newChat) => {
        const admin = activeUsers.find((user) => user.role === "admin")
        if (admin) {
            io.to(admin.socketId).emit("newChat", newChat)
        }

    })

    // Gửi tin nhắn
    socket.on("sendMessage", (newMessage) => {
        const user = activeUsers.find((user) => user._id == newMessage.receiver?._id)
        if (user) {
            io.to(user.socketId).emit("newMessage", newMessage)
        }
    })

    // update product price theo time
    socket.on("adminUpdatePrice", (option) => {
        // Phát sự kiện 'updateAttributeProduct' đến tất cả các client đang kết nối
        io.emit('adminUpdateProduct', option)
    })
    // update thôn tin sản phẩm theo time
    socket.on("adminUpdateInforProduct", (option) => {
        // Phát sự kiện 'updateInforProduct' đến tất cả các client đang kết nối
        io.emit('adminUpdateProduct', option)
    })
    // Xóa sản phẩm
    socket.on("adminDeleteProduct", (option) => {
        // Phát sự kiện 'deleteProduct' đến tất cả các client đang kết nối
        io.emit('deleteProduct', option)
    })

    // Xóa size sản phẩm 
    socket.on("adminDeleteSize", (option) => {
        // Phát sự kiện 'deleteSize' đến tất cả các client đang kết nối
        io.emit('deleteSize', option)
    })
    // Xóa màu sản phẩm 
    socket.on("adminDeleteColor", (option) => {
        // Phát sự kiện 'deleteColor' đến tất cả các client đang kết nối
        io.emit('deleteColor', option)
    })

    socket.on('send', (data) => {
        // phát sự kiện cho toàn bộ client
        io.emit('adminSend', data)
    })

    //xóa user của admin
    socket.on('adminDeleteUser', (userData) => {
        io.emit("deleteUser", userData)
    })

    // tắt trạng thái hoạt động của admin
    socket.on('adminStatusUser', (userStatusData)=>{
        io.emit("statusUser", userStatusData)
    })
    socket.on('addComment',(data) =>{
        // phát sự kiện cho toàn bộ client
        io.emit('userAddComment',data)
    })
    socket.on('addReComment',(data) =>{
        // phát sự kiện cho toàn bộ client
        io.emit('userAddRecomment',data)
    })

    socket.on('updateOrderStatus',(data) =>{
        // phát sự kiện cho toàn bộ client
        io.emit('onUpdateOrderStatus',data)
    })
    
    
})




