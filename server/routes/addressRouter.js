import express from "express";
import {
  creatAddress,
  deleteAddress,
  getAllAddress,
  getByIdAddress,
  updateAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", getAllAddress);
router.get("/:userId", getByIdAddress);
router.delete("/:userId", deleteAddress);
router.put("/:userId", updateAddress);
router.post("/", creatAddress);

export default router;
