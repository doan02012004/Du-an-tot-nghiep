import { Router } from "express";
import { create, getAll } from "../controllers/categoryController.js";


const router = Router();
router.get("/", getAll);
;
router.post("/", create);

router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById)

export default router;
