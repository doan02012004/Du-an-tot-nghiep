import AddressModel from "../models/addressModel.js";
import { StatusCodes } from "http-status-codes";

// lấy toàn bộ thông tin bảng
export const getAllAddress = async (req, res) => {
  try {
    const address = await AddressModel.find().populate("userId");
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
    const address = await AddressModel.findByIdAndDelete(req.params.userId);
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

export const updateAddress = async (req, res) => {
  try {
    const address = await AddressModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    return res.status(StatusCodes.OK).json(address);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
