import express from "express";
import { getRevenue, getStatusOrdersCountByDate, getUserNewCountByDate } from "../controllers/dashboardController.js";

const router = express.Router();


router.get("/revenue", getRevenue);
router.get("/order", getStatusOrdersCountByDate);
router.get("/user/count", getUserNewCountByDate);



export default router;