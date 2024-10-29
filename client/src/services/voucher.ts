import instance from "../common/config/axios";
import { IVoucher } from "../common/interfaces/voucher";

// Lấy tất cả voucher
export const getAllVouchers = async () => {
  try {
    const { data } = await instance.get("/vouchers");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Lấy voucher theo ID
export const getVoucherById = async (id: string) => {
  try {
    const { data } = await instance.get(`/vouchers/id/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Lấy voucher theo ID
export const getVoucherByCode = async (code: string) => {
  try {
    const { data } = await instance.get(`/vouchers/code/${code}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Tạo mới voucher
export const createVoucher = async (voucher: IVoucher) => {
  try {
    const { data } = await instance.post("/vouchers", voucher);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cập nhật voucher
export const updateVoucher = async (voucher: IVoucher) => {
  try {
    const { data } = await instance.put(`/vouchers/${voucher._id}`, voucher);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Xóa voucher
export const deleteVoucher = async (id: string) => {
  try {
    const { data } = await instance.delete(`/vouchers/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const checkVoucher = async(voucher: IVoucher)=>{
  try {
    const { data } = await instance.put(`/vouchers/${voucher._id}`, voucher);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}