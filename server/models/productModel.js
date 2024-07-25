import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema({
    size:{type:String},
    color:{type:String},
    image:{type:String},
    instock:{type:Number,default:0}
},{
    _id:true, timestamps:true,versionKey:false
})

const productShema = new mongoose.Schema({
    name:{type:String, required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'categories'},
    price_old:{type:Number, required:true},
    discount:{type:Number, default:0},
    gender:{type:String, enum:['male',"female","unisex"],default:"unisex"},
    description:{type:String, default:""},
    featured:{type:Boolean,default:false},
    status:{type:Boolean, default:true},
    attributes:[attributeSchema]
},{
    timestamps:true , versionKey:false
})

const ProductModel = mongoose.model('products',productShema)
export default ProductModel