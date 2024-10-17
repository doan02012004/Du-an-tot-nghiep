import instance from "../common/config/axios";
import { IGallery } from './../common/interfaces/gallery';

export const getAll = async () => {
  try {
    const res = await instance.get("/gallerys");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id: number | string | undefined) => {
  try {
    const res = await instance.get("/gallerys/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGallery = async (data: IGallery) => {
  try {
    const res = await instance.post("/gallerys", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGalleryById = async (data: IGallery) => {
  try {
    const res = await instance.put("/gallerys/" + data._id, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteGalleryById = async (id: number | string | undefined) => {
  try {
    const res = await instance.delete("/gallerys/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};