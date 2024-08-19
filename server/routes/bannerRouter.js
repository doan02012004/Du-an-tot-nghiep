import { Router } from "express";
import {
  create,
  deleteBannerById,
  getAll,
  getBannerById,
  updateBannerById,
} from "../controllers/bannerController.js";

const router = Router();
router.get("/", getAll);
router.post("/", create);

router.get("/:bannerId", getBannerById);
router.delete("/:bannerId", deleteBannerById);
router.put("/:bannerId", updateBannerById);

export default router;
