import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    linkPrd: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("gallerys", gallerySchema);