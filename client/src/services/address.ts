import instance from "../common/config/axios";
import { Iaddress } from "../common/interfaces/address";

export const getAllAddress = async (userId:string|number) => {
  try {
    const res = await instance.get(`/addresses/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAddressByUserId = async (userId?: string) => {
  try {
    const res = await instance.get(`/addresses/detail/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAddress = async (option: Iaddress) => {
  try {
    const res = await instance.post(`/addresses`, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const updateAddress = async (option: Iaddress, userId?: string) => {
//   try {
//     const res = await instance.put(`/addresses/${userId}`, option);
//     return res.data;
//   } catch (error) {
//     console.log("error");
//   }
// };

export const updateAddress = async (option: Iaddress) => {
  try {
    const res = await instance.put(`/addresses/${option?._id}`, option);
    return res;
  } catch (error) {
    console.log("Error updating address:", error);
  }  
};

export const deleteAddress = async (userId?: string) => {
  try {
    const res = await instance.delete(`/addresses/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
