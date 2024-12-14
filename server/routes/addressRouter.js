import express from "express";
import {
  creatAddress,
  deleteAddress,
  getAllAddress,
  getByIdAddress,
  updateAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/:userId", getAllAddress);
router.get("/detail/:userId", getByIdAddress);
router.delete("/:id", deleteAddress);
router.put("/:id", updateAddress);
router.post("/", creatAddress);

export default router;
