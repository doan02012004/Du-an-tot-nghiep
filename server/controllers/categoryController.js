
import Category from "../models/categoryModel.js";
import slugify from "slugify";
export const create = async (req, res) => {
    try {
        const categoy = await Category.create({
            name: req.body.name,
            slug: slugify(req.body.name, "-"),
        });

        return res.status(200).json(categoy);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(404).json({ message: "Không có danh mục nào!" });
        }
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

