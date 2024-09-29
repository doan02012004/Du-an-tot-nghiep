import galleryModel from "../models/galleryModel.js";

export const create = async (req, res) => {
  try {
    const gallery = await galleryModel.create(req.body);

    return res.status(200).json(gallery);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const gallerys = await galleryModel.find();

    return res.status(200).json(gallerys);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await galleryModel.findById(req.params.galleryId);
    if (!gallery)
      return res
        .status(404)
        .json({ message: "Không tìm thấy gallery bạn cần!" });
    return res.status(200).json(gallery);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const deleteGalleryById = async (req, res) => {
  try {
    const gallery = await galleryModel.findByIdAndDelete(req.params.galleryId);
    return res.status(200).json(gallery);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const updateGalleryById = async (req, res) => {
  try {
    const gallery = await galleryModel.findByIdAndUpdate(
      req.params.galleryId,
      req.body,
      { new: true }
    );
    return res.status(200).json(gallery);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
