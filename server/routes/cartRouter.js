import { Router } from "express";
import { addToCart, getCartByUserId } from "../controllers/cartController.js";


const router = Router();
router.get("/:userId", getCartByUserId);
router.post("/addtocart/:userId", addToCart);
// router.get("/:id", getCategoryById);
// router.delete("/:id", deleteCategoryById);
// router.put("/:id", updateCategoryById);

export default router;
