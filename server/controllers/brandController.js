
import Brand from "../models/brandModel.js";
import slugify from "slugify";
import ProductModel from "../models/productModel.js";
export const create = async (req, res) => {
    try {
        const brand = await Brand.create({
            name: req.body.name,
            status:req.body.status,
            slug: slugify(req.body.name, "-"),
        });

        return res.status(200).json(brand);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getAll = async (req, res) => {
    try {
        const brands = await Brand.find({});
        return res.status(200).json(brands);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (brand.length === 0)
            return res
                .status(404)
                .json({ message: "Không tìm thấy sản phẩm nào!" });
        return res.status(200).json(brand);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
export const deleteBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        const findbr = await Brand.findOne({name:"Không xác định"})
        const productUpdate = await ProductModel.updateMany(
            { brandId: req.params.id }, 
            { brandId: findbr._id }  
        );
        return res.status(200).json(brand);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
export const updateBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id, {...req.body, slug: slugify(req.body.name, "-")}, { new: true });
        return res.status(200).json(brand);
    } catch (error) {
        return res.status(500).json({ error });
    }
};