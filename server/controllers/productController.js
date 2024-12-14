import { query } from "express";
import ProductModel from "../models/productModel.js";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import SearchModel from "../models/searchModel.js";
import deleteImage from "../utils/signature.js";
import CartModel from "../models/cartModel.js";

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

''
const generateRegex = (search) => {
  const accentsMap = { // Định nghĩa bảng ánh xạ ký tự
    a: "[aàáạảãâầấậẩẫăằắặẳẵ]",
    e: "[eèéẹẻẽêềếệểễ]",
    i: "[iìíịỉĩ]",
    o: "[oòóọỏõôồốộổỗơờớợởỡ]",
    u: "[uùúụủũưừứựửữ]",
    y: "[yỳýỵỷỹ]",
    d: "[dđ]",
    A: "[AÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]",
    E: "[EÈÉẸẺẼÊỀẾỆỂỄ]",
    I: "[IÌÍỊỈĨ]",
    O: "[OÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]",
    U: "[UÙÚỤỦŨƯỪỨỰỬỮ]",
    Y: "[YỲÝỴỶỸ]",
    D: "[DĐ]"
  };

  let regexStr = search.split('').map(char => { //search.split(''): Chia từ khóa tìm kiếm search thành mảng các ký tự.
    return accentsMap[char] || char; // nếu là ký tự có dấu, thêm tất cả các biến thể
  }).join('');

  return new RegExp(regexStr, 'i'); // 'i' là để không phân biệt hoa thường
};

export const getAllProduct = async (req, res) => {
  const { userId } = req; // Lấy thông tin userId từ token hoặc session
  try {
    const { min_price, limit, page, max_price, sizes, colors,search,categorySlug, sell_order,active } = req.query;
    const _limit = parseInt(limit) || 12;
    const _page = parseInt(page) || 1;
    const skip = _limit * (_page - 1);

    let sort = {};
    let query = {
      active:active??{$in:[true,false]},
      $and: [
        { "attributes.price_new": { $gte: parseInt(min_price) || 0 } },
        { "attributes.price_new": { $lte: parseInt(max_price) || 10000000 } },
      ],
    };
    if(categorySlug){
      const category = await categoryModel.findOne({slug:categorySlug})
      if(category){
        query['categoryId'] = category._id 
      }
    }
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
    if (search) {
      const regex = generateRegex(search); // Tạo regex từ từ khóa tìm kiếm
      query['name'] = { $regex: regex };
    }

    // Lọc theo size nếu có
    if (sizes) {
      query["sizes"] = { $in: sizes.split(",") };
    }

    // Lọc theo color nếu có
    if (colors) {
      query["colors"] = {
        $elemMatch: {
          name: { $in: colors.split(",").map((name) => new RegExp(name, "i")) },
        },
      };
    }

  
    const products = await ProductModel.find(query)
      .sort(sort)
      .limit(_limit)
      .skip(skip)
      .populate("categoryId brandId")
      .exec();

    if (userId && search) {
        await trackSearchHistory(userId, search);
    }
    
    const total = await ProductModel.countDocuments(query);
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
const trackSearchHistory = async (userId, search) => {
  try {
      const existingSearch = await SearchModel.findOne({ userId, search });

      if (existingSearch) {
          // Tăng số lần tìm kiếm nếu từ khóa đã tồn tại trong lịch sử
          existingSearch.searchCount += 1;
          await existingSearch.save();
      } else {
          // Tạo mới bản ghi nếu từ khóa chưa từng được tìm kiếm
          await SearchModel.create({ userId, search });
      }
  } catch (error) {
      console.error('Error tracking search history:', error);
  }
};

export const getProductSlider = async (req, res) => {
  try {
    const genderQuery = req.query._gender || "";
    const featuredQuery = req.query._isFeatured || "";
    const discountQuery = parseInt(req.query._isSale, 10) || 0;
    const queryProduct = {
      active:true
    };
    if (genderQuery) {
      queryProduct["gender"] = { $in: [genderQuery, "unisex"] };
    }
    if (featuredQuery) {
      queryProduct["featured"] = featuredQuery;
    }
    if (discountQuery >= 50) {
      queryProduct["attributes"] = {
        $elemMatch: {
          discount: { $gte: discountQuery }, // Kiểm tra discount >= 50
        },
      };
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
export const getProductSimilar = async (req, res) => {
  try {
    const categoryId = req.query.categoryId
    const productId = req.query.productId

    const products = await ProductModel.find({
      _id:{$ne:productId},
      categoryId:categoryId
    }).populate(
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
    const newProduct = await ProductModel.findById({ _id: req.params.productId }).populate('categoryId brandId');
    return res.status(200).json({
      data: newProduct,
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
        active: req.body.active,
        gender: req.body.gender,
      },
      { new: true }
    ).populate('categoryId brandId');
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
    const carts = await CartModel.updateMany({},{
      $pull:{
        carts:{
          productId:req.params.productId
        }
      }
    })
    return res.status(200).json({message:'ok'});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteSize = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId).populate('categoryId brandId');
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
   if(product.sizes.length> 1){
    // mảng attributeId để updateMany
    const filterAttribute = product.attributes.filter(
      (item) => item.size == req.body.size
    );
    const atbId = filterAttribute.map((item) => item._id)
    // product
    const newSize = product.sizes.filter((item) => item !== req.body.size);
    const newAttributes = product.attributes.filter(
      (item) => item.size !== req.body.size
    );
    product.sizes = newSize;
    product.attributes = newAttributes;
    await product.save();

    // cart
     await CartModel.updateMany({},{
      $pull:{
        carts:{
          productId:req.params.productId,
          attributeId: {$in:atbId}
        }
      }
    })
    return res.status(200).json({
      message: "Xóa size thành công !",
      success: true,
      product:product
    });
   }else{
    return res.status(404).json({
      message: "Xóa size thất bại!",
      success: false
    });
   }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteColor = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId).populate('categoryId brandId')
    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }
  if(product.colors.length>1){
    // mảng attributeId để updateMany
    const filterAttribute = product.attributes.filter(
      (item) => item.color == req.body.name
    );
    const atbId = filterAttribute.map((item) => item._id)

    // product
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
    // cart
     await CartModel.updateMany({},{
      $pull:{
        carts:{
          productId:req.params.productId,
          attributeId: {$in:atbId}
        }
      }
    })
    return res.status(200).json({
      message: "Xóa màu sắc thành công !",
      success: true,
      product:product
    });
  }else{
    return res.status(404).json({
      message: "Xóa màu thất bại!",
      success: false
    });
  }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addImageGallery = async(req,res) =>{
  try {
    const {productId,galleryId,imageUrl} = req.body;
    const product = await ProductModel.findById(productId)
    const gallery = product.gallerys.find(item => item._id.toString() == galleryId)
    gallery.items.push(imageUrl)
    await product.save()
    return res.status(200).json({
      message:"Thêm ảnh thành công",
      data:product
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
export const updateAvatarGallery = async(req,res) =>{
  try {
    const {productId,galleryId,imageUrl} = req.body;
    const product = await ProductModel.findById(productId)
    const gallery = product.gallerys.find(item => item._id.toString() == galleryId)
    const old_avatar = gallery.avatar;
    gallery.avatar = imageUrl;
    gallery.items = gallery.items.map((item) => item == imageUrl?old_avatar:item)
    await product.save()
    return res.status(200).json({
      message:"Cập nhật ảnh đại diện thành công",
      data:product
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const deleteImageProduct = async(req,res) =>{
  try {
    const {imageUrl,galleryId,productId} = req.body
    const product = await ProductModel.findById(productId)
    const objectProduct = product.toObject()
    const galleryIndex = product.gallerys.findIndex((item) => item._id == galleryId);
    if(galleryIndex > -1 && product.gallerys[galleryIndex].items.length > 1){
      const data = await deleteImage(imageUrl);
      if(data?.status == 200){
        product.gallerys[galleryIndex].items = product.gallerys[galleryIndex].items.filter((item) => item !== imageUrl);
        await product.save()
        return res.status(200).json({message:"ok"})
      }else{
        return res.status(400).json({message:"Fail"})
      }
    }else{
      return res.status(400).json({message:"Không thể xóa"})
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
