import { StatusCodes } from "http-status-codes"
import CartModel from "../models/cartModel.js"
import ProductModel from "../models/productModel.js"

export const getCartByUserId = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.userId }).populate("carts.productId")
        const cartData = {
            carts: cart.carts,
        }
        return res.status(200).json(cartData)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const {userId, productId, attributeId, quantity, galleryId } = req.body

        const carts = await CartModel.findOne({userId})
        const product = await ProductModel.findOne({ _id: productId })
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!carts) {
            if (attribute.instock < quantity) {
                return res.status(400).json({ message: "sản phẩm không đủ hàng" })
            } else {
                const newCart = new CartModel({
                    userId,
                    carts: [],
                })
                newCart.carts.push({
                    productId: productId,
                    quantity: quantity,
                    attributeId: attributeId,
                    galleryId: galleryId
                })
                await newCart.save()
                return res.status(200).json({ message: "ok" })
            }
        } else {
            const checkProduct = carts.carts.find(item => (item.productId == productId && item.attributeId == attributeId))
            if (checkProduct) {
                if (Number(attribute.instock) < Number(quantity + checkProduct.quantity)) {
                    return res.status(400).json({ message: "sản phẩm không đủ hàng" })
                } else {
                    checkProduct.quantity += quantity
                }
            } else {
                if (attribute.instock < quantity) {
                    return res.status(400).json({ message: "sản phẩm không đủ hàng" })
                } else {
                    carts.carts.unshift({
                        productId: productId,
                        quantity: quantity,
                        attributeId: attributeId,
                        galleryId: galleryId
                    })
                }
                }
                await carts.save()
                return res.status(200).json({ message: "ok" })
            }

        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

// tăng số lượng sản phẩm trong giỏ hàng

export const increaseProductCartQuantity = async (req,res)=>{
    const {userId,productId,attributeId} = req.body
    try {
        const cart = await CartModel.findOne({userId:userId})
        const product = await ProductModel.findOne({_id:productId})
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Cart not found"})
        }
        const cartItem = cart.carts.find((item)=> (item.productId == productId && item.attributeId == attributeId))
        if (!cartItem) {
            return res.status(StatusCodes.NOT_FOUND).json({message:"Product not found in cart"})
        }
        // validate số lượng
        if (cartItem.quantity+1 <= attribute.instock) {
            cartItem.quantity++
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Số lượng sản phẩm không đủ"})
        }
        // 
        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
// giảm số lượng sản phẩm
export const decreaseProductCartQuantity  = async (req,res)=>{
    const {userId,productId,attributeId} = req.body
    try {
        const cart = await CartModel.findOne({userId:userId})
        const product = await ProductModel.findOne({_id:productId})
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Cart not found"})
        }
        const cartItem = cart.carts.find((item)=> item.productId.toString() === productId && item.attributeId.toString() === attributeId)
        if (!cartItem) {
            return res.status(StatusCodes.NOT_FOUND).json({message:"Product not found in cart"})
        }
        // validate số lượng
        if (cartItem.quantity-1 > 0) {
            cartItem.quantity--
        }else{
            const newCarts = cart.carts.filter((item)=> item._id !== cartItem._id)
            cart.carts = newCarts
        }
        // 
        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
// nhập số từ input
export const onInputProductCartQuantity = async (req,res)=>{
    const {userId,productId,attributeId,quantity} = req.body
    try {
        const cart = await CartModel.findOne({userId:userId})
        const product = await ProductModel.findOne({_id:productId})
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Cart not found"})
        }
        const cartItem = cart.carts.find((item)=> item.productId.toString() === productId && item.attributeId.toString() === attributeId)
        if (!cartItem) {
            return res.status(StatusCodes.NOT_FOUND).json({message:"Product not found in cart"})
        }
        // validate số lượng
        if (quantity <= attribute.instock && quantity>0) {
            cartItem.quantity = Number(quantity)
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Số lượng không hợp lệ"})
        }
        // 
        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

// xoá sản phẩm
export const removeProductCartQuantity  = async (req,res)=>{
    const {userId,productId,attributeId} = req.body
    try {
        const cart = await CartModel.findOne({userId:userId})
        const product = await ProductModel.findOne({_id:productId})
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Cart not found"})
        }
        const cartItem = cart.carts.find((item)=> item.productId.toString() === productId && item.attributeId.toString() === attributeId)
        if (!cartItem) {
            return res.status(StatusCodes.NOT_FOUND).json({message:"Product not found in cart"})
        }
        const newCarts = cart.carts.filter((item)=> item._id !== cartItem._id)
        cart.carts = newCarts
        await cart.save()
        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

