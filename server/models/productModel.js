import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  avatar: { type: String },
  name: { type: String },
  items: [{ type: String }],
});
const attributeSchema = new mongoose.Schema({
  size: { type: String },
  color: { type: String },
  weight: { type: Number },
  height: { type: Number },
  width: { type: Number },
  length: { type: Number },
  volume: { type: Number },
  price_old: { type: Number, required: true },
  price_new: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  instock: { type: Number, default: 0 },
  active:{type:Boolean,default:true}
});
const colorSchema = new mongoose.Schema({
  name: { type: String },
  background: { type: String },
});
const productShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brands" },
    gallerys: [gallerySchema],
    sizes: [{ type: String, default: "FREESIZE" }],
    colors: [colorSchema],
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
      default: "unisex",
    },
    description: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    attributes: [attributeSchema],
    purchases: { type: Number, default: 0 },
    comment: [],
   
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("products", productShema);
export default ProductModel;
