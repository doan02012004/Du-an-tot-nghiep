import { IBrands } from './../common/interfaces/brands';
import instance from "../common/config/axios";

export const getAll = async () => {
  try {
    const {data} = await instance.get("/brands"); // Thay đổi URL nếu cần
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getBrandById = async (id : string) => {
    try {
       const {data} =  await instance.get(`/brands/${id}`);
       return data
    } catch (error) {
        return error
    }
}

export const create = async (brand: IBrands) => {
    try {
      const {data} = await instance.post("/brands",brand); // Thay đổi URL nếu cần
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const update = async (brand : IBrands) => {
        try {
            const {data} = await instance.put(`/brands/${brand._id}`, brand);
            return data;
        } catch (error) {
            return error
        }
  }
  export const deleteCate = async (brand : IBrands) => {
        try {
            await instance.delete(`/brands/${brand._id}`);
        } catch (error) {
            return error
        }
  }
