import dotenv from 'dotenv'
import UserModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { registerSchema, loginSchema, addSchema } from "../validations/userValidations.js"
// import generateRefreshToken from "../ultils/tokenAuth.js"
import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import BlackListModel from '../models/blackListModel.js'
import { HistoryUpdateUser } from '../models/historyUpdateUserModel.js'
import AddressModel from '../models/addressModel.js'
dotenv.config()
let refreshTokens = [];
// lấy toàn bộ user
export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.status(StatusCodes.OK).json(users)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

// lấy user theo id
export const getByIdUser = async (req, res) => {

    const id = req.params.id
    try {
        const users = await UserModel.findById(id)
        // const passwordCorrect = await bcrypt.compare(password, user?.password || "");

        // kiếm tra ng dùng tồn tại hay không
        if (!users) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        return res.status(StatusCodes.OK).json(users)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        return res.status(StatusCodes.OK).json(users)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

//update usser theo id
export const updateUser = async (req, res) => {
    try {
        const { password, ...others } = req.body; // Lấy password riêng ra

        // Tìm người dùng theo ID
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Không tìm thấy người dùng với ID này',
            });
        }
        // Tạo đối tượng để lưu những thay đổi
        const changes = {};

        // Nếu người dùng gửi mật khẩu mới, hash lại trước khi lưu
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            if (hashedPassword !== user.password) {
                changes.password = hashedPassword; // Ghi nhận thay đổi mật khẩu
                user.password = hashedPassword; // Cập nhật mật khẩu đã hash vào user
            }
        }
        // So sánh và ghi nhận các thay đổi khác
        Object.keys(others).forEach((key) => {
            if (others[key] !== user[key]) {
                changes[key] = others[key];
                user[key] = others[key]; // Cập nhật giá trị mới vào user
            }
        });

         // Lưu người dùng với thông tin mới
         await user.save();

         // Chỉ lưu vào collection `HistoryUpdateUser` nếu có thay đổi
         if (Object.keys(changes).length > 0) {
             const updatedUserData = {
                 originalUser: user._id, // Lưu ID của user gốc
                 changes: changes, // Chỉ lưu những trường đã thay đổi
                 updateTime: new Date(), // Lưu thời gian cập nhật
             };
 
             // Tạo mới và lưu vào collection `HistoryUpdateUser`
             const updatedUserRecord = new HistoryUpdateUser(updatedUserData);
             await updatedUserRecord.save();
         }
 
         // Trả về thông tin người dùng (trừ mật khẩu)
         const { password: hashedPass, ...updatedUser } = user._doc; // Loại bỏ mật khẩu
         return res.status(StatusCodes.OK).json(updatedUser);
         
     } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message: error.message,
         });
     }
 };

export const updateUserStatus = async (req, res) => {
    try {
        const users = await UserModel.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        //kiem tra user xem đã tồn tại theo id trên đường dẫn
        return res.status(StatusCodes.OK).json(users)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}
export const add = async (req, res) => {
    //nhận request từ user 
    const User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        date: req.body.date,
        gender: req.body.gender,
        city: req.body.city,
        district: req.body.district,
        ward: req.body.ward,
        address: req.body.address,
        role: req.body.role
    }
    try {
        //lấy schemma để validate
        const { error } = addSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Nếu có lỗi sẽ trả về tất cả lỗi
            return res.status(StatusCodes.NOT_FOUND).json({ errors: error.details.map(err => err.message) });
        }

        const existUser = await UserModel.findOne({ email: User.email })
        //kiểm tra xem tk đã tồn tại chưa
        if (existUser) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Email đã tồn tại"
            })
        }
        //mã hóa mật khẩu khẩu bằng jwt
        const hashPassword = await bcrypt.hash(User.password, 10)



        //sau khi pass qua các bước trên thì ta sẽ tạo đc 1 tài khoản mới
        const userData = await UserModel.create({
            ...req.body,
            password: hashPassword,

        })
        return res.status(StatusCodes.CREATED).json({
            message: "Đăng ký thành công",
            data: userData
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "lỗi máy chủ" })

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
            return res.status(StatusCodes.NOT_FOUND).json({ errors: error.details.map(err => err.message) });
        }

        const existUser = await UserModel.findOne({ email: User.email })
        //kiểm tra xem tk đã tồn tại chưa
        if (existUser) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Email đã tồn tại"
            })
        }
        //mã hóa mật khẩu khẩu bằng jwt
        const hashPassword = await bcrypt.hash(User.password, 10)
        // ở đây thì ta sử dụng countDocuments để đọc số lượng trong collection user nếu như ko có thì tài khoản đầu tiên là "admin"
        const role = (await UserModel.countDocuments({})) === 0 ? "admin" : "user";

        //sau khi pass qua các bước trên thì ta sẽ tạo đc 1 tài khoản mới
        const userData = await UserModel.create({
            ...User,
            password: hashPassword,
            role
        })
        const address = await AddressModel.create(
            {
                ...req.body,
                fullname: `${User.firstname} ${User.lastname}`,
                isDefault:true

            }
        )
        return res.status(StatusCodes.CREATED).json({
            message: "Đăng ký thành công",
            status:200,
            data: userData
        })
    } catch (error) {
        console.log("lỗi đăng kí", error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "lỗi máy chủ" })

    }
}
//tạo access token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_TOKEN_ACC,
        { expiresIn: process.env.TIME_TOKEN_ACC }
    )
}

//tạo refresh token
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_TOKEN_REF,
        { expiresIn: process.env.TIME_TOKEN_REF }
    )
}

// đăng nhập tài khoản
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //lấy schemma để validate
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Nếu có lỗi sẽ trả về tất cả lỗi
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: error.details.map(err => err.message) });
        }

        const user = await UserModel.findOne({ email })
        const passwordCorrect = await bcrypt.compare(req.body.password, user?.password || "");

        //kiểm tra tài khoản đã tồn tại chưa thông qua email
        if (!user) {
           return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có tài khoản" })
        }

        //kiểm tra mật khẩu có đúng không giữa req người dùng nhập với pass có sẵn trong db
        if (!passwordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "sai mật khẩu" });
        }
        //    const token =  generateRefreshToken(user._id, res);
        if (user && passwordCorrect) {
            //accessToken
            const accessToken = generateAccessToken(user)
            //refreshToken  
            const refreshToken = generateRefreshToken(user)
            refreshTokens.push(refreshToken)
            res.cookie('refeshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,// Thời gian sống của cookie, ví dụ: 1 ngày
            })
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,// Thời gian sống của cookie, ví dụ: 1 ngày
            })
            //trả về ko có mk
            const { password, ...orthers } = user._doc
            return res.status(StatusCodes.OK).json({
                ...orthers, accessToken
            })
        } else {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
        }


    } catch (error) {
        console.log("lỗi đăng nhập", error.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "lỗi máy chủ" })
    }
}

export const requestRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refeshToken;
        const acToken = req.cookies.accessToken;
        if (!refreshToken) return res.status(403).json({
            EC: 1,
            message: "Bạn chưa đăng nhập",
        })
        const tokenBlackList = await BlackListModel.findOne({ token: refreshToken });
        if (tokenBlackList) {
            return res.status(StatusCodes.FORBIDDEN).json({ EC: 1, error: "refeshToken hết hạn" })
        }
        // if (!refreshTokens.includes(refreshToken)) {
        //     return res.status(StatusCodes.FORBIDDEN).json('refresh token it not valid')
        // }
        if (acToken) {
            jwt.verify(acToken, process.env.JWT_TOKEN_ACC, (err, user) => {
                if (err) {
                    jwt.verify(refreshToken, process.env.JWT_TOKEN_REF, (err, user) => {
                        if (err) {
                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ EC: 1, error: "refeshToken hết hạn" })
                        }
                        else {
                            //lọc token cũ ra 
                            // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                            const newAccessToken = generateAccessToken(user)
                            res.cookie('accessToken', newAccessToken, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                                maxAge: 30 * 24 * 60 * 60 * 1000,// Thời gian sống của cookie, ví dụ: 1 ngày
                            })
                            return res.status(StatusCodes.OK).json({ accessToken: newAccessToken })
                        }
                    })
                }
                else {
                    return res.status(StatusCodes.OK).json({ accessToken: acToken })
                }
            })
        } else {
            jwt.verify(refreshToken, process.env.JWT_TOKEN_REF, (err, user) => {
                if (err) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ EC: 1, error: "refeshToken hết hạn" })
                }
                //lọc token cũ ra 
                // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
                const newAccessToken = generateAccessToken(user)
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000,// Thời gian sống của cookie, ví dụ: 1 ngày
                })
                return res.status(StatusCodes.OK).json({ accessToken: newAccessToken })
            })
        }
    } catch (error) {
        console.log("lỗi xuất lại token:", error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "lỗi máy chủ" })
    }
}
//-------------------------------------------------------------------//
export const getAccount = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id }).select('-password')
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "lỗi máy chủ" })
    }
}

// đăng xuất tài khoản
export const logout = async (req, res) => {

    try {
        const refreshToken = req.cookies.refeshToken;
        // Kiểm tra nếu không có cookie accessToken và refreshToken
        if (!req.cookies.accessToken || !refreshToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Người dùng chưa đăng nhập hoặc token không tồn tại",
            });
        }
        const token = await BlackListModel.create({ token: refreshToken });

        // Xóa token khỏi cookies
        res.clearCookie('accessToken');
        res.clearCookie('refeshToken');

        return res.status(StatusCodes.OK).json({
            SC: 1,
            message: "Đăng xuất thành công"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "lỗi máy chủ" })
    }
}

//lấy lích sử đã update tài khoản user
export const getHistoryUpdateUser = async (req, res) => {
    try {
        // Lấy toàn bộ lịch sử cập nhật từ database
        const history = await HistoryUpdateUser.find()
            .populate('originalUser', 'firstname lastname') // Lấy tên người dùng từ thông tin gốc (nếu cần)
            .exec();
        
        // Format lại dữ liệu để chỉ trả về các trường đã thay đổi
        const formattedHistory = history.map((record) => {
            return {
                _id: record._id,
                originalUser: record.originalUser,
                changes: record.changes, // Đây là các trường đã thay đổi
                updateTime: record.updateTime
            };
        });

        // Trả về lịch sử đã được format
        res.status(200).json(formattedHistory);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi máy chủ: không thể lấy được lịch sử cập nhật',
        });
    }
};
