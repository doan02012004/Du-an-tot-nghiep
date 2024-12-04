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
import sendEmail from '../utils/sendEmail.js'
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

// Cập nhật thông tin user theo ID
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

        // Sao lưu thông tin gốc để lưu lịch sử
        const originalUser = { ...user._doc };

        // Tạo đối tượng để lưu những thay đổi
        const changes = {};

        // Nếu người dùng gửi mật khẩu mới, hash lại trước khi lưu
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            if (hashedPassword !== user.password) {
                changes.password = 'Mật khẩu đã thay đổi'; // Không lưu mật khẩu dưới dạng plaintext
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
                isDefault: true

            }
        )
        return res.status(StatusCodes.CREATED).json({
            message: "Đăng ký thành công",
            status: 200,
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

// quên mật khẩu
export const forgot = async (req, res) => {
    try {
        const { email } = req.body;

        // Kiểm tra xem email có tồn tại trong hệ thống không
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có tài khoản" });
        }

        // Tạo token reset mật khẩu với thời gian hết hạn 15 phút
        const token = jwt.sign({ userId: user._id }, process.env.KEY_SECRET, {
            expiresIn: "15m",
        });

        // Lưu token và thời gian hết hạn vào cơ sở dữ liệu
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;  // Hết hạn sau 15 phút
        await user.save();

        // Tạo đường link chứa token cho việc reset mật khẩu
        const resetLink = `${process.env.CLIENT_URL}/forgot?token=${token}`;

        // Gửi email cho người dùng
        const subject = "Khôi phục mật khẩu đăng nhập Fendi Shop";
        const html = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                text-align: center;
                margin-bottom: 30px;
              }
              .email-body {
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                margin-bottom: 30px;
              }
              .email-body p {
                margin-bottom: 10px;
              }
              .reset-link {
                display: block     ;
                padding: 0.75rem 1rem;
                width: 100%;
                background-color: #221f20;
                color: #f7f8f9;
                font-weight: 600;
                border-radius: 0.375rem;
                text-align: center;
                text-decoration: none;
                transition: background-color 0.3s, color 0.3s;
                }

                .reset-link:hover {
                background-color: #f7f8f9;
                color: #221f20;
                }
              .footer {
                font-size: 14px;
                text-align: center;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Khôi phục mật khẩu</h1>
              </div>
  
              <div class="email-body">
                <p>Chào ${user.firstname || "bạn"},</p>
                <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Để tiếp tục, vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu:</p>
                <a href="${resetLink}" class="reset-link">Đặt lại mật khẩu</a>
                <p>Lưu ý: Liên kết này sẽ hết hạn sau 15 phút.</p>
                <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
              </div>
  
              <div class="footer">
                <p>Trân trọng,</p>
                <p>Đội ngũ hỗ trợ của chúng tôi</p>
              </div>
            </div>
          </body>
        </html>
      `;

        await sendEmail(email, subject, html);

        // Trả về thông báo đã gửi email
        // return res.status(StatusCodes.OK).json({
        //     message: "Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư!",
        // });

        res.status(200).json(user)

    } catch (error) {
        console.error("Lỗi khi xử lý quên mật khẩu:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Lỗi máy chủ. Vui lòng thử lại sau!",
        });
    }
};

// Hàm xác minh token reset mật khẩu
export const verifyResetToken = async (req, res) => {
    const { token } = req.body;
    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.KEY_SECRET);

        // Tìm người dùng dựa trên userId trong token
        const user = await UserModel.findById(decoded.userId);

        // Kiểm tra xem người dùng có tồn tại và token có hết hạn không
        if (!user || user.resetPasswordExpires < Date.now()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ isValid: false });
        }

        return res.status(StatusCodes.OK).json({ isValid: true });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ isValid: false });
    }
};

// Hàm thay đổi mật khẩu
export const resetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;

    try {
        // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp hay không
        if (password !== confirmPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Mật khẩu xác nhận không khớp' });
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.KEY_SECRET);

        // Tìm người dùng dựa trên userId trong token
        const user = await UserModel.findById(decoded.userId);

        // Kiểm tra xem token có hết hạn không
        if (!user || user.resetPasswordExpires < Date.now()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token không hợp lệ' });
        }

        // Mã hóa mật khẩu mới
        const hashPassword = await bcrypt.hash(password, 10);

        // Cập nhật mật khẩu mới cho người dùng
        user.password = hashPassword;  // Cập nhật mật khẩu đã mã hóa
        user.resetPasswordToken = null;  // Xóa token reset mật khẩu
        user.resetPasswordExpires = null; // Xóa thời gian hết hạn
        await user.save();

        // Đường link dến Fendi Shop
        const Link = `${process.env.CLIENT_URL}`;

        // **Gửi email thông báo đổi mật khẩu thành công**
        const subject = "Thông báo khôi phục mật khẩu đăng nhập Fendi Shop thành công";
        const html = `
     <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
                .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                text-align: center;
                margin-bottom: 30px;
              }
              .email-body {
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                margin-bottom: 30px;
              }
              .email-body p {
                margin-bottom: 10px;
              }
                .reset-link {
                display: block     ;
                padding: 0.75rem 1rem;
                width: 100%;
                background-color: #221f20;
                color: #f7f8f9;
                font-weight: 600;
                border-radius: 0.375rem;
                text-align: center;
                text-decoration: none;
                transition: background-color 0.3s, color 0.3s;
                }

                .reset-link:hover {
                background-color: #f7f8f9;
                color: #221f20;
                }
                .footer {
                font-size: 14px;
                text-align: center;
                color: #666;
              }
                </style>
         <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Khôi phục mật khẩu</h1>
              </div>
  
              <div class="email-body">
                <p>Chào ${user.firstname || "bạn"},</p>
         <p>Mật khẩu của bạn đã được thay đổi thành công. Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
         <a href="${Link}" class="reset-link">FENDI SHOP</a>
         <div class="footer">
                <p>Trân trọng,</p>
                <p>Đội ngũ hỗ trợ của chúng tôi</p>
              </div>
              </div>
              </div>
              </body>
        </html>
     `;
        await sendEmail(user.email, subject, html);

        // Trả về phản hồi thành công
        return res.status(StatusCodes.OK).json({ message: 'Mật khẩu đã được thay đổi thành công!' });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Có lỗi xảy ra' });
    }
};

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
            .populate('originalUser', 'email firstname lastname') // Lấy email và tên người dùng từ thông tin gốc
            .sort({ updateTime: -1 }) // Sắp xếp theo thời gian cập nhật mới nhất
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
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi máy chủ: không thể lấy được lịch sử cập nhật',
        });
    }
};


// Xóa lịch sử cập nhật user theo id
export const deleteHistoryUpdateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const historyRecord = await HistoryUpdateUser.findByIdAndDelete(id);
        if (!historyRecord) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Không tìm thấy lịch sử cập nhật với ID này',
            });
        }
        return res.status(StatusCodes.OK).json({
            message: 'Xóa lịch sử cập nhật thành công',
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// Lấy chi tiết lịch sử cập nhật user theo id
export const getHistoryUpdateUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const historyRecord = await HistoryUpdateUser.findById(id)
            .populate('originalUser', 'email firstname lastname'); // Lấy thông tin người dùng liên quan
        if (!historyRecord) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Không tìm thấy lịch sử cập nhật với ID này',
            });
        }

        return res.status(StatusCodes.OK).json(historyRecord);
    } catch (error) {

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// Kiểm tra mật khẩu hiện tại và cập nhật mật khẩu mới
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await UserModel.findById({ _id: req.user._id });

        if (!user) {
            console.error('Không tìm thấy người dùng!');
            throw new Error('Không tìm thấy người dùng!');
        }

        // Kiểm tra mật khẩu hiện tại
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            console.log('Mật khẩu hiện tại không đúng!');
            return res.status(500).json({ message: "Mật khẩu hiện tại không đúng!" })
        }
        // Kiểm tra mật khẩu mới có khác mật khẩu cũ không
        if (currentPassword === newPassword) {
            console.error('Mật khẩu mới không được giống với mật khẩu hiện tại!');
            throw new Error('Mật khẩu mới không được giống với mật khẩu hiện tại!');
        }

        // Mã hóa mật khẩu mới và lưu lại
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        //   // Đường link dến Fendi Shop
        // const Link = `${process.env.CLIENT_URL}`;

        // // **Gửi email thông báo đổi mật khẩu thành công**
        // const subject = "Thông báo đổi mật khẩu đăng nhập Fendi Shop thành công";
        // const html = `
        // <html>
        //      <head>
        //        <style>
        //          body {
        //            font-family: Arial, sans-serif;
        //            background-color: #f2f2f2;
        //            margin: 0;
        //            padding: 0;
        //          }
        //            .email-container {
        //            max-width: 600px;
        //            margin: 0 auto;
        //            background-color: #fff;
        //            padding: 20px;
        //            border-radius: 10px;
        //            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        //          }
        //          .email-header {
        //            text-align: center;
        //            margin-bottom: 30px;
        //          }
        //          .email-body {
        //            font-size: 16px;
        //            line-height: 1.5;
        //            color: #333;
        //            margin-bottom: 30px;
        //          }
        //          .email-body p {
        //            margin-bottom: 10px;
        //          }
        //            .reset-link {
        //            display: block     ;
        //            padding: 0.75rem 1rem;
        //            width: 100%;
        //            background-color: #221f20;
        //            color: #f7f8f9;
        //            font-weight: 600;
        //            border-radius: 0.375rem;
        //            text-align: center;
        //            text-decoration: none;
        //            transition: background-color 0.3s, color 0.3s;
        //            }

        //            .reset-link:hover {
        //            background-color: #f7f8f9;
        //            color: #221f20;
        //            }
        //            .footer {
        //            font-size: 14px;
        //            text-align: center;
        //            color: #666;
        //          }
        //            </style>
        //     <body>
        //        <div class="email-container">
        //          <div class="email-header">
        //            <h1>Đổi mật khẩu</h1>
        //          </div>

        //          <div class="email-body">
        //            <p>Chào ${user.firstname || "bạn"},</p>
        //     <p>Mật khẩu của bạn đã được thay đổi thành công. Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
        //     <a href="${Link}" class="reset-link">FENDI SHOP</a>
        //     <div class="footer">
        //            <p>Trân trọng,</p>
        //            <p>Đội ngũ hỗ trợ của chúng tôi</p>
        //          </div>
        //          </div>
        //          </div>
        //          </body>
        //    </html>
        // `;
        // await sendEmail(user.email, subject, html);
        return res.status(StatusCodes.OK).json({ message: 'Mật khẩu đã được cập nhật thành công!' });

    } catch (error) {
        console.error('Error in changePassword:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Có lỗi xảy ra!', error: error.message });
    }
};