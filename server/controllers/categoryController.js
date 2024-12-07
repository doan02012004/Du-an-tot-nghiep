
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import slugify from "slugify";
export const create = async (req, res) => {
    try {
        const categoy = await Category.create({
            name: req.body.name,
            status:req.body.status,
            slug: slugify(req.body.name, "-"),
        });

        return res.status(200).json(categoy);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getAll = async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: "products", // Collection name for products
                    localField: "_id", // `_id` của danh mục
                    foreignField: "categoryId", // `categoryId` trong sản phẩm
                    as: "products", // Kết quả sau khi nối
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1, // Lấy tên danh mục
                    slug : 1,
                    productCount: { $size: "$products" }, // Đếm số lượng sản phẩm
                },
            },
        ]);

        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ error: "Server error" });
    }
};


export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        const cateData = await Category.findOne({ name: "Không xác định" });
        if (!cateData) {
            return res.status(404).json({ message: "Danh mục  không tồn tại!" });
        }
        const productUpdate = await Product.updateMany(
            { categoryId: req.params.id }, 
            { categoryId: cateData._id }  
        );

        return res.status(200).json(category, productUpdate);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
export const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {...req.body, slug: slugify(req.body.name, "-")}, { new: true });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error });
    }
};