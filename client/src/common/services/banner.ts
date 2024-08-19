import instance from "../config/axios";
import { IBanner } from "./../interfaces/Banner";

export const getAll = async () => {
  try {
    const res = await instance.get("/banners");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id: number | string | undefined) => {
  try {
    const res = await instance.get("/banners/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBanner = async (data: IBanner) => {
  try {
    const res = await instance.post("/banners", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBannerById = async (data: IBanner) => {
  try {
    const res = await instance.put("/banners/" + data._id, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteBannerById = async (id: number | string | undefined) => {
  try {
    const res = await instance.delete("/banners/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
