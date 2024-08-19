import bannerModel from "../models/bannerModel.js";

export const create = async (req, res) => {
  try {
    const banner = await bannerModel.create(req.body);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const banners = await bannerModel.find();

    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getBannerById = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params.bannerId);
    if (!banner)
      return res
        .status(404)
        .json({ message: "Không tìm thấy banner bạn cần!" });
    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const deleteBannerById = async (req, res) => {
  try {
    const banner = await bannerModel.findByIdAndDelete(req.params.bannerId);
    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const updateBannerById = async (req, res) => {
  try {
    const banner = await bannerModel.findByIdAndUpdate(
      req.params.bannerId,
      req.body,
      { new: true }
    );
    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
