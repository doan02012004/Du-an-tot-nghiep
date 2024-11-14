import express from "express";
import { getMonthlyRevenue, getRevenue, getStatusOrdersCountByDate, getTopSellingProduct, getTopUserByDate, getTopUserCity, getUserNewCountByDate } from "../controllers/dashboardController.js";

const router = express.Router();


router.get("/revenue", getRevenue);
router.get("/order", getStatusOrdersCountByDate);
router.get("/order/month", getMonthlyRevenue);
router.get("/user/count", getUserNewCountByDate);
router.get("/user/top", getTopUserByDate);
router.get("/user/city", getTopUserCity);
router.get("/product/top", getTopSellingProduct);


export default router;