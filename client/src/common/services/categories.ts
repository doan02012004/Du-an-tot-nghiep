import instance from "./../config/axios";
import { ICategories } from "./../interfaces/categories";

export const getAll = async () => {
  try {
    const { data } = await instance.get("/categories"); // Thay đổi URL nếu cần
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCateById = async (id: string) => {
  try {
    const { data } = await instance.get(`/categories/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const create = async (category: ICategories) => {
  try {
    const { data } = await instance.post("/categories", category); // Thay đổi URL nếu cần
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (category: ICategories) => {
  try {
    const { data } = await instance.put(
      `/categories/${category._id}`,
      category
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const deleteCate = async (category: ICategories) => {
  try {
    await instance.delete(`/categories/${category._id}`);
  } catch (error) {
    return error;
  }
};
