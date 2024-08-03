
import instance from "../common/config/axios";
import { Icategories } from "../interface/categories";

export const getAll = async () => {
  try {
    const {data} = await instance.get("/categories"); // Thay đổi URL nếu cần
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const create = async (category:Icategories) => {
    try {
      const {data} = await instance.post("/categories",category); // Thay đổi URL nếu cần
      return data;
    } catch (error) {
      console.log(error);
    }
  };
