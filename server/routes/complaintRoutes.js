import { Router } from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = Router();

// Lấy tất cả khiếu nại
router.get("/", getAllComplaints);

// Tạo khiếu nại mới
router.post("/", createComplaint);

// Lấy khiếu nại theo ID
router.get("/:complaintId", getComplaintById);

// Cập nhật trạng thái khiếu nại
router.put("/:complaintId", updateComplaintStatus);

export default router;
