import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    imageUrl:{type:String},
    name:{type:String},
})
const attributeSchema = new mongoose.Schema({
    size:{type:String},
    color:{type:String},
    instock:{type:Number,default:0},
    background:{type:String},
})
const productShema = new mongoose.Schema({
    name:{type:String, required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'categories'},
    price_old:{type:Number, required:true},
    discount:{type:Number, default:0},
    gallerys:[gallerySchema],
    gender:{type:String, enum:['male',"female","unisex"],default:"unisex"},
    description:{type:String, default:""},
    featured:{type:Boolean,default:false},
    status:{type:Boolean, default:true},
    attributes:[attributeSchema],
    purchases:{type:Number, default:0},
    comment:[]
},{
    timestamps:true , versionKey:false
})

const ProductModel = mongoose.model('products',productShema)
export default ProductModel