import UserModel from "../models/userModel.js"

// lấy toàn bộ user
export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.status(201).json(users)
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

// lấy user theo id
export const getByIdUser = async (req, res) => {
    const id = req.params.id
    try {
        const users = await UserModel.findById(id)
        // kiếm tra ng dùng tồn tại hay không
        if (!users) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// xoá user theo id
export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const users = await UserModel.findByIdAndDelete(id)
        if (!users) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//update usser theo id
export const updateUser = async (req, res) => {
    try {
        const users = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        //kiem tra user xem đã tồn tại theo id trên đường dẫn
        if (!users) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


//đăng kí tài khoản
export const register = async (req, res) => {
    //nhận request từ user 
    const User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone: req.body.phone,
        date: req.body.date,
        gender: req.body.gender,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        address: req.body.address
    }
    try {
        const oldUser = await UserModel.findOne({ email: User.email })
        //kiểm tra xem tk đã tồn tại chưa
        if (oldUser) {
            return res.status(401).json({
                message: "Email đã tồn tại"
            })
        }
        //kiểm tra mật khẩu có trùng nhau khi đăng kí không
        if (User.password !== User.confirmPassword) {
            return res.status(400).json({
                error: "Mật khẩu không trùng khớp"
            })
        }
        //mã hóa mật khẩu khẩu bằng jwt
        const hashPassword = await bcrypt.hash(User.password, 10)
        User.password = hashPassword

        //sau khi pass qua các bước trên thì ta sẽ tạo ddc 1 tài khoản mới và trả về trạng thái
        const userData = await UserModel.create(User)
        return res.status(201).json({
            message: "Đăng ký thành công",
            data: userData
        })
    } catch (error) {
        console.log("lỗi.", error.message)
        return res.status(500).json({ error: "lỗi máy chủ" })

    }
}