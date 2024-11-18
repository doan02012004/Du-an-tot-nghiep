import mongoose, { Schema } from "mongoose";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};


const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true
    },
    gallery: {
        avatar: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        items: []
    },
    price: {
        type: Number,
        required: true,
    },
    attribute: {
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
},
    { timestamps: true, versionKey: false }
);


const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        customerInfor: {
            fullname: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },
            ward: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            option: {
                type: String,
                enum: ["house", "company"]
            }
        },
        items: [OrderItemSchema],
        orderNumber: {
            type: String,
            unique: true,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "vnPay", "atm", "credit"],
            default: "cash"
        },
        status: {
            type: String,
            enum: ["pending", "cancelpayment", "unpaid", "paid", "confirmed", "shipped", "delivered", "cancelled", "received"],
            default: "pending",
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        totalOrder: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        ship: {
            nameBrand: {
                type: String,
                required: true
            },
            value: {

            }
        }
    },
    { timestamps: true, versionKey: false }
);

// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
    if (!this.orderNumber) {
        this.orderNumber = generateOrderNumber();
    }
    next();
});

export default mongoose.model("orders", orderSchema);