import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
    {
        name: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        status:{
            type:String,
        },
    },
    { timestamps: true, versionKey: false }
);
const categoryModel= mongoose.model("Categories", categoriesSchema);
export default categoryModel                                                                                                                                                                                               