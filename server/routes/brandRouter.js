import { Router } from "express";
import { create, deleteBrandById, getAll, getBrandById, updateBrandById } from "../controllers/brandController.js";



const router = Router();
router.get("/", getAll);
router.post("/", create);
router.get("/:id", getBrandById);
router.delete("/:id", deleteBrandById);
router.put("/:id", updateBrandById);

export default router;
