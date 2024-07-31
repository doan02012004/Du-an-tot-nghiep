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
        const products = await ProductModel.find()
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

export const getByIdProduct = async(req, res)=>{
    try {
     
        const product = await ProductModel.findById(req.params.productId).populate('categoryId')
        if(!product){
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateInforProduct = async(req,res)=>{
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate({_id:req.params.productId},
            {
                name:req.body.name,
                categoryId:req.body.categoryId,
                discount:req.body.discount,
                price_old:req.body.price_old,
                description:req.body.description,
                featured:req.body.featured,
                status:req.body.status,
                gender:req.body.gender
            },
            {new:true}
        )
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteProduct = async(req, res)=>{
    try {
     
        const product = await ProductModel.findByIdAndDelete(req.params.productId)
        if(!product){
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


