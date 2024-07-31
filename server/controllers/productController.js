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
        const products = await ProductModel.find()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
