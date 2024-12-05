import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Liên kết với bảng users
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }, // Liên kết với bảng products
    status: { type: Boolean, default: true }, // true = yêu thích, false = không yêu thích nữa
  },
  { timestamps: true, versionKey: false }
);

const FavoriteModel = mongoose.model('favorites', favoriteSchema);
export default FavoriteModel;
