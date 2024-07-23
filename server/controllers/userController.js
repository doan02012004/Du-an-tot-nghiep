import UserModel from "../models/userModel.js"
// lấy toàn bộ user
export const getAllUser = async (req,res)=>{
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
export const getByIdUser = async (req,res)=>{
    const id = req.params.id
    try {
        const users = await UserModel.findById(id)
        // kiếm tra ng dùng tồn tại hay k
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
export const deleteUser = async (req,res)=>{
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
export const updateUser = async (req,res)=>{
    try {
        const users = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
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