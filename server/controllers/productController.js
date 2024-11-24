import { query } from "express";
import ProductModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      ...req.body,
      slug: slugify(req.body.name, "-")
    }
    const product = await ProductModel.create(newProduct);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { min_price, limit, page, max_price, size, color, sell_order } = req.query;
    const _limit = parseInt(limit) || 12;
    const _page = parseInt(page) || 1;
    const skip = _limit * (_page - 1);

    let sort = {};
    let query = {
      $and: [
        { "attributes.price_new": { $gte: parseInt(min_price) || 0 } },
        { "attributes.price_new": { $lte: parseInt(max_price) || 10000000 } },
      ],
    };

    if (sell_order) {
      if (sell_order === "new") {
        sort["createdAt"] = -1; 
      }
      if (sell_order === "asc") {
        sort["attributes.price_new"] = 1; // Giá tăng dần
      }
      if (sell_order === "desc") {
        sort["attributes.price_new"] = -1; // Giá giảm dần
      }
    }

    // Lọc theo size nếu có
    if (size) {
      query["sizes"] = { $in: size.split(",") };
    }

    // Lọc theo color nếu có
    if (color) {
      query["colors"] = {
        $elemMatch: {
          name: { $in: color.split(",").map((name) => new RegExp(name, "i")) },
        },
      };
    }

    const products = await ProductModel.find(query)
      .sort(sort)
      .limit(_limit)
      .skip(skip)
      .populate("categoryId brandId");

    const total = await ProductModel.countDocuments(query);
    console.log(total);
    const totalPage = Math.ceil(total / _limit);

    return res.status(200).json({
      products,
      total,
      totalPage,
      currentPage: _page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;  // Lấy slug từ URL
    const { min_price, max_price, limit, page, size, color, sell_order } = req.query;  // Lấy các tham số lọc từ query string

    // Kiểm tra slug có tồn tại không
    if (!slug) {
      return res.status(400).json({ message: "Slug is required." });
    }

    // Tìm danh mục theo slug
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Tính toán phân trang
    const _limit = parseInt(limit) || 12;  // Giới hạn sản phẩm trên mỗi trang, mặc định là 12
    const _page = parseInt(page) || 1;  // Trang hiện tại, mặc định là 1
    const skip = _limit * (_page - 1);  // Tính số lượng sản phẩm bỏ qua

    // Khởi tạo query cơ bản
    let query = {
      categoryId: category._id,  // Lọc sản phẩm theo categoryId
      $and: [
        { "attributes.price_new": { $gte: parseInt(min_price) || 0 } },  // Lọc theo giá tối thiểu nếu có
        { "attributes.price_new": { $lte: parseInt(max_price) || 10000000 } },  // Lọc theo giá tối đa nếu có
      ],
    };

    // Lọc theo size nếu có
    if (size) {
      query["sizes"] = { $in: size.split(",") };  // Lọc theo size
    }

    // Lọc theo color nếu có
    if (color) {
      query["colors"] = {
        $elemMatch: {
          name: { $in: color.split(",").map((name) => new RegExp(name, "i")) },  // Lọc theo màu sắc
        },
      };
    }

    // Sắp xếp sản phẩm nếu có yêu cầu
    let sort = {};
    if (sell_order) {
      if (sell_order === "new") {
        sort["createdAt"] = -1;  // Sắp xếp theo ngày tạo mới nhất
      }
      if (sell_order === "asc") {
        sort["attributes.price_new"] = 1;  // Giá tăng dần
      }
      if (sell_order === "desc") {
        sort["attributes.price_new"] = -1;  // Giá giảm dần
      }
    }

    // Lấy sản phẩm với các điều kiện lọc và sắp xếp
    const products = await ProductModel.find(query)
      .sort(sort)  // Sắp xếp
      .skip(skip)  // Bỏ qua số lượng sản phẩm theo phân trang
      .limit(_limit)  // Giới hạn số lượng sản phẩm mỗi trang
      .populate("categoryId brandId");

    // Tính tổng số sản phẩm và tổng số trang
    const total = await ProductModel.countDocuments(query);  // Đếm tổng số sản phẩm thỏa mãn điều kiện
    const totalPage = Math.ceil(total / _limit);  // Tính tổng số trang

    return res.status(200).json({
      products,
      total,
      totalPage,
      currentPage: _page,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};







export const getProductSlider = async (req, res) => {
  try {
    const genderQuery = req.query._gender || "";
    const featuredQuery = req.query._isFeatured || "";
    const discountQuery = req.query._isSale || "";
    const queryProduct = {};
    if (genderQuery) {
      queryProduct["gender"] = { $in: [genderQuery, "unisex"] };
    }
    if (featuredQuery) {
      queryProduct["featured"] = featuredQuery;
    }
    if (discountQuery) {
      queryProduct["discount"] = { $gte: discountQuery };
    }
    const products = await ProductModel.find(queryProduct).populate(
      "categoryId"
    );
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAttributeProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.productId });
    const newAttributes = product.attributes.map((item) =>
      item._id == req.body._id ? req.body : item
    );
    product.attributes = newAttributes;
    await product.save();
    return res.status(200).json({
      data: product,
      message: "Cập nhật thuộc tính thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const addSizes = async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.productId });
    const newSizes = [...product.sizes, ...req.body.sizes];
    const newAttributes = [...product.attributes, ...req.body.attributes];
    product.sizes = newSizes;
    product.attributes = newAttributes;
    await product.save();
    return res.status(200).json({
      message: "Cập nhật size thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const addColors = async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.productId });
    const newColors = [...product.colors, ...req.body.colors];
    product.colors = newColors;
    product.gallerys.push(...req.body.gallerys);
    product.attributes.push(...req.body.attributes);
    await product.save();
    return res.status(200).json({
      message: "Cập nhật màu sắc thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getBySlugProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug }).populate(
      "categoryId colors"
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateInforProduct = async (req, res) => {
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.productId },
      {
        name: req.body.name,
        slug: slugify(req.body.name, "-"),
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
        discount: req.body.discount,
        price_new: req.body.price_new,
        price_old: req.body.price_old,
        description: req.body.description,
        featured: req.body.featured,
        status: req.body.status,
        gender: req.body.gender,
      },
      { new: true }
    );
    return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateGallery = async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.productId });
    const newGallerys = product.gallerys.map((item) =>
      item._id == req.body._id ? req.body : item
    );
    product.gallerys = newGallerys;
    await product.save();
    return res.status(200).json({
      message: "Update thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteSize = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    const newSize = product.sizes.filter((item) => item !== req.body.size);
    const newAttributes = product.attributes.filter(
      (item) => item.size !== req.body.size
    );
    product.sizes = newSize;
    product.attributes = newAttributes;
    await product.save();
    return res.status(200).json({
      message: "Xóa size thành công !",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteColor = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId).populate(
      "colors"
    );
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
    product.colors = product.colors.filter(
      (item) => item.name !== req.body.name
    );
    product.gallerys = product.gallerys.filter(
      (item) => item.name !== req.body.name
    );
    product.attributes = product.attributes.filter(
      (item) => item.color !== req.body.name
    );
    await product.save();
    return res.status(200).json({
      message: "Xóa màu sắc thành công !",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
