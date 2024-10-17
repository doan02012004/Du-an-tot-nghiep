import mongoose, { Schema } from 'mongoose'
const cartItem = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        },
        attributeId: {
            type: String
        },
        galleryId: {
            type: String
        }

    }
)

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    carts: [
        cartItem
    ],
}, { timestamps: true, versionKey: false })




const CartModel = mongoose.model('carts', cartSchema)
export default CartModel