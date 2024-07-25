import { query } from "express"
import ProductModel from "../models/productModel.js"

export const createProduct = async(req, res)=>{
    try {
        const product = await ProductModel.create(req.body)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getAllProduct = async(req, res)=>{
    try {
        const { slug, minPrice, maxPrice, gender } = req.query;
    //     let query = {};
    // if (categorySlug) {
    //     // Tìm categoryId dựa trên slug
    //     const category = await Category.findOne({ slug: categorySlug });
    //     if (category) {
    //       query.category = category._id;
    //     } else {
    //       return res.status(404).json({ message: 'Category not found' });
    //     }
    //   }
  
    //   if (minPrice) {
    //     query.price = { ...query.price, $gte: Number(minPrice) };
    //   }
  
    //   if (maxPrice) {
    //     query.price = { ...query.price, $lte: Number(maxPrice) };
    //   }
        const products = await ProductModel.find().populate('categoryId')
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateAttributeProduct = async(req,res)=>{
    try {
        const updateProduct = await ProductModel.findOneAndUpdate(
            {_id:req.params.productId, "attributes._id":req.params.attributeId},
            {
                $set:{
                    "attributes.$.image": req.body.image,
                    "attributes.$.instock": req.body.instock
                }
            },
            {
                new:true
            }
        )
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
