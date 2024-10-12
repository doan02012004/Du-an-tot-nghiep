import { Router } from "express";
import {
  create,
  deleteGalleryById,
  getAll,
  getGalleryById,
  updateGalleryById,
} from "../controllers/galleryController.js";

const router = Router();
router.get("/", getAll);
router.post("/", create);

router.get("/:galleryId", getGalleryById);
router.delete("/:galleryId", deleteGalleryById);
router.put("/:galleryId", updateGalleryById);

export default router;