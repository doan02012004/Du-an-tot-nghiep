import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import UserModel from "../models/userModel.js"
dotenv.config()


export const checkAuth = async (req, res, next) => {
    try {
        if (req?.headers?.authorization?.split(" ")?.[1]) {
            const token = req?.headers?.authorization?.split(" ")?.[1]
            if (!token) {
                return res.status(401).json(
                    {
                        message: "Token không tồn tại "
                    }
                )
            }
            try {
                const decoded = await jwt.verify(token, process.env.JWT_TOKEN_ACC)
                const user = await UserModel.findOne({ _id: decoded.id })
                req.user = user
                next()
            } catch (error) {
                return res.status(401).json({ message: "Token hết hạn / không hợp lệ " })
            }
        } else {
            return res.status(401).json({
                message: "Token không tồn tại"
            })
        }

    } catch (error) {
        return res.status(401).json({ message: "Token hết hạn / không hợp lệ " })
    }
}
