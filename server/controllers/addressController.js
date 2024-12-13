import AddressModel from "../models/addressModel.js";
import { StatusCodes } from "http-status-codes";

// lấy toàn bộ thông tin bảng
export const getAllAddress = async (req, res) => {
  try {
    const address = await AddressModel.find({userId:req.params.userId}).populate("userId");
    return res.status(StatusCodes.OK).json(address);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getByIdAddress = async (req, res) => {
  try {
    const address = await AddressModel.findById(req.params.userId);
    if (!address) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy ID người dùng này" });
    }
    return res.status(StatusCodes.OK).json(address);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const creatAddress = async (req, res) => {
  try {
    const newAddress = {
      ...req.body,
    };
    if (newAddress.isDefault == true) {
      const addresses = await AddressModel.findOneAndUpdate(
        { userId: newAddress.userId, isDefault: true },
        { isDefault: false }
      );
    }
    const address = await AddressModel.create(req.body);
    return res.status(StatusCodes.CREATED).json(address);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await AddressModel.findById(req.params.id);
    if(!address){
      return res.status(StatusCodes.NOT_FOUND).json({
        message:'không tìm thấy địa chỉ'
      })
    }
    if(address.isDefault == true){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:'không thể xóa địa chỉ mặc định'
      })
    }
    const deleteAddress = await AddressModel.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json(deleteAddress);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await AddressModel.findById(
      req.params.id
    );
    if(!address){
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:'không tìm thấy địa chỉ'
      })
    }
    const listAddress = await AddressModel.find({ _id:{$ne:req.params.id},userId:address.userId});
    if(listAddress.length == 0){
      const newAddress = await AddressModel.findByIdAndUpdate(
        req.params.id,
        {...req.body,isDefault:true},
       {new:true}
      );
      if(newAddress){
        return res.status(201).json({
          message:'Cập nhật thành công'
        })
      }else{
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:'Cập nhật thất bại'
        })
      }
    }
    if(listAddress.length >0){
      if(address.isDefault == true && req.body?.isDefault == false){
        if(!listAddress.some((item) => item.isDefault == true)){
          return res.status(StatusCodes.BAD_REQUEST).json({
            message:'Ít nhất 1 địa chỉ là mặc định'
          })
        }
      }
      const newAddress = await AddressModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
      );
      if(newAddress.isDefault == true){
        await AddressModel.updateMany({
          _id:{$ne:req.params.id},
          userId:address.userId
        },{
          isDefault:false
        });
        return res.status(201).json({
          message:'Cập nhật thành công'
        })
      }
      return res.status(201).json({
        message:'Cập nhật thành công'
      })
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
