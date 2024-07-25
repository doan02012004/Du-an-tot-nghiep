import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, updateCategoryById } from "../controllers/categoryController.js";


const router = Router();
router.get("/", getAll);
;
router.post("/", create);
export default router;
