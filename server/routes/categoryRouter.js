import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, updateCategoryById } from "../controllers/categoryController.js";


const router = Router();
router.get("/", getAll);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById);
router.post("/", create);
export default router;
