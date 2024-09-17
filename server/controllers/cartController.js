import CartModel from "../models/cartModel.js"
import ProductModel from "../models/productModel.js"

export const getCartByUserId = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.userId })
        const cartData = {
            carts: cart.carts,
            totalPrice: cart.totalPrice
        }
        return res.status(200).json(cartData)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, attributeId, quantity, galleryId } = req.body

        const carts = await CartModel.findOne({ userId: req.params.userId })
        const product = await ProductModel.findOne({ _id: productId })
        const attribute = product.attributes.find(item => item._id == attributeId)
        if (!carts) {
            if (attribute.instock < quantity) {
                return res.status(400).json({ message: "sản phẩm không đủ hàng" })
            } else {
                const newCart = new CartModel({
                    userId: req.params.userId,
                    totalPrice: 0,
                    carts: []
                })
                newCart.carts.push({
                    productId: productId,
                    quantity: quantity,
                    attributeId: attributeId,
                    total: Number(product.price_new * quantity),
                    validateCart: true,
                    galleryId: galleryId
                })
                newCart.totalPrice = Number(product.price_new * quantity)
                await newCart.save()
                return res.status(200).json({ message: "thêm mới giỏ hàng thành công" })
            }
        } else {
            const checkProduct = carts.carts.find(item => (item.productId == productId && item.attributeId == attributeId))
            if (checkProduct) {
                if (attribute.instock < quantity + checkProduct.quantity) {
                    return res.status(400).json({ message: "sản phẩm không đủ hàng" })
                } else {
                    checkProduct.quantity += quantity
                    checkProduct.total = Number(product.price_new * checkProduct.quantity)
                }
            } else {
                if (attribute.instock < quantity) {
                    return res.status(400).json({ message: "sản phẩm không đủ hàng" })
                } else {
                    carts.carts.push({
                        productId: productId,
                        quantity: quantity,
                        attributeId: attributeId,
                        total: Number(product.price_new * quantity),
                        validateCart: true,
                        galleryId: galleryId
                    })
                }
                }
                carts.totalPrice = carts.carts.reduce((total, item) => total + item.total, 0)
                await carts.save()
                return res.status(200).json({ message: "thêm sản phẩm vào giỏ hàng thành công" })
            }

        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

