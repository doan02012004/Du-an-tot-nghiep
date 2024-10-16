import express from "express";
import {
  addColors,
  addSizes,
  createProduct,
  deleteColor,
  deleteProduct,
  deleteSize,
  getAllProduct,
  getBySlugProduct,
  getProductSlider,
  updateAttributeProduct,
  updateGallery,
  updateInforProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/slider", getProductSlider);
router.put("/updateAtb/:productId", updateAttributeProduct);
router.put("/updateInfor/:productId", updateInforProduct);
router.put("/updateGallery/:productId", updateGallery);
router.put("/addSizes/:productId", addSizes);
router.put("/addColors/:productId", addColors);
router.put("/deleteColor/:productId", deleteColor);
router.put("/deleteSize/:productId", deleteSize);
router.delete("/:productId", deleteProduct),
  router.get("/:slug", getBySlugProduct);

export default router;
