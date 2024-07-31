import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
    size:{type:String},
    color:{type:String},
    image:{type:String}
},{
    _id:true, timestamps:true,versionKey:false
})

const productShema = new mongoose.Schema({
    name:{type:String, required:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'categories'},
    price_old:{type:Number, required:true},
    discount:{type:Number, default:0},
    attributes:[attributeSchema]
},{
    timestamps:true , versionKey:false
})

const ProductModel = mongoose.model('products',productShema)
export default ProductModel