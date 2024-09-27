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
        total: {
            type: Number,
            default: 0
        },
        validateCart: {
            type: Boolean,
            default: true
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
    totalPrice: {
        type: Number,
        default: 0
    },
    carts: [
        cartItem
    ],
    totalCart: {
        type: Number,
        default: 0
    }
}, { timestamps: true, versionKey: false })




const CartModel = mongoose.model('carts', cartSchema)
export default CartModel