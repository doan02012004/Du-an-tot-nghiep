import { Router } from "express";
import { addToCart, decreaseProductCartQuantity, getCartByUserId, increaseProductCartQuantity, onInputProductCartQuantity } from "../controllers/cartController.js";


const router = Router();
router.get("/:userId", getCartByUserId);
router.post("/addtocart", addToCart);
// router.get("/:id", getCategoryById);
// router.delete("/:id", deleteCategoryById);
// router.put("/:id", updateCategoryById);
router.post("/increase",increaseProductCartQuantity)
router.post("/decrease",decreaseProductCartQuantity)
router.post("/oninput",onInputProductCartQuantity)

export default router;
