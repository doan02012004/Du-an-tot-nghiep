import mongoose, { Schema } from "mongoose";

const recommentItemSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users"
        }
    ],
    comment: {
        type: String,
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null
    },
},
{ timestamps: true, versionKey: false }
)
const commentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products"
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "users"
            }
        ],
        comment: {
            type: String,
            required: true
        },
        recomments: [
            recommentItemSchema
        ],
        tag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null
        },
        rating:{
            type:Number,
            default:1
        }
    },
    { timestamps: true, versionKey: false }
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel