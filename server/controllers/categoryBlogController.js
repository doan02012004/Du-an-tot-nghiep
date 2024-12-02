import slugify from "slugify";  // Đảm bảo đã import slugify
import CategoryBlog from "../models/categoryBlog.js"; // Import model

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, status } = req.body;

    const existingCategory = await CategoryBlog.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    }

    // Tạo slug từ name
    const slug = slugify(name, { lower: true, strict: true });

    const newCategory = new CategoryBlog({
      name,
      status,
      slug,  
    });

    await newCategory.save();
    res.status(201).json({ message: "Danh mục đã được tạo thành công", newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tạo danh mục thất bại" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryBlog.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lấy danh mục thất bại" });
  }
};

// // Get category by slug
// export const getCategoryBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const categories = await CategoryBlog.findOne({ slug });

//     if (!categories) {
//       return res.status(404).json({ message: "Danh mục không tồn tại" });
//     }

//     res.status(200).json({ categories });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Lấy danh mục thất bại" });
//   }
// };

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;  // Thay vì categoryId, dùng id
    const { name, status } = req.body;

    const category = await CategoryBlog.findById(id);  // Sử dụng id thay vì categoryId
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    category.name = name;
    category.slug = slugify(name, { lower: true, strict: true });  // Tạo slug từ name khi cập nhật
    category.status = status;

    await category.save();
    res.status(200).json({ message: "Danh mục đã được cập nhật", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cập nhật danh mục thất bại" });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;  // Thay vì categoryId, dùng id

    const category = await CategoryBlog.findById(id);  // Sử dụng id thay vì categoryId
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    await category.deleteOne();  // Sử dụng deleteOne thay vì remove
    res.status(200).json({ message: "Danh mục đã được xoá" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Xoá danh mục thất bại" });
  }
};


// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ request parameters
    const categories = await CategoryBlog.findById(id); // Tìm danh mục theo id

    if (!categories) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lấy danh mục thất bại" });
  }
};
