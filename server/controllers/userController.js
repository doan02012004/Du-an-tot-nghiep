import UserModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { registerSchema, loginSchema } from "../validations/userValidations.js"
import generateRefreshToken from "../ultils/tokenAuth.js"

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
        //lấy schemma để validate
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Nếu có lỗi sẽ trả về tất cả lỗi
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }

        const existUser = await UserModel.findOne({ email: User.email })
        //kiểm tra xem tk đã tồn tại chưa
        if (existUser) {
            return res.status(401).json({
                message: "Email đã tồn tại"
            })
        }
        //mã hóa mật khẩu khẩu bằng jwt
        const hashPassword = await bcrypt.hash(User.password, 10)
        // ở đây thì ta sử dụng countDocuments để đọc số lượng trong collection user nếu như ko có thì tài khoản đầu tiên là "admin"
        const role = (await UserModel.countDocuments({})) === 0 ? "admin" : "user";

        //sau khi pass qua các bước trên thì ta sẽ tạo đc 1 tài khoản mới
        const userData = await UserModel.create({
            ...req.body,
            password: hashPassword,
            role
        })
        return res.status(201).json({
            message: "Đăng ký thành công",
            data: userData
        })
    } catch (error) {
        console.log("lỗi đăng kí", error.message)
        return res.status(500).json({ error: "lỗi máy chủ" })

    }
}


// đăng nhập tài khoản
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //lấy schemma để validate
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Nếu có lỗi sẽ trả về tất cả lỗi
            return res.status(400).json({ errors: error.details.map(err => err.message) });
        }

        const user = await UserModel.findOne({ email })
        const passwordCorrect = await bcrypt.compare(password, user?.password || "");

        //kiểm tra tài khoản đã tồn tại chưa thông qua email
        if (!user) {
            res.status(404).json({ message: "Không có tài khoản" })
        }

        //kiểm tra mật khẩu có đúng không giữa req người dùng nhập với pass có sẵn trong db
        if (!user || !passwordCorrect) {
            return res.status(400).json({ error: "sai mật khẩu" });
        }
        // lấy token ở bên fodels ultils
       const token =  generateRefreshToken(user._id, res);
        
        return res.status(200).json({
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            date: user.date,
            gender: user.gender,
            city: user.city,
            district: user.district,
            ward: user.ward,
            address: user.address
        })

    } catch (error) {
        console.log("lỗi đăng nhập", error.message)
        res.status(500).json({ error: "lỗi máy chủ" })
    }
}


// đăng xuất tài khoản
export const logout = async (req, res) => {
    try {
        //thiết lập cookie là giá trị rỗng và cho thời gian sống bằng 0
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: "đăng xuất thành công" })
    } catch (error) {
        console.log("lỗi đăng xuất", error.message)
        res.status(500).json({ error: "lỗi máy chủ" })
    }
}