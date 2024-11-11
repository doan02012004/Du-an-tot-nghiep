import express from "express";
import { getRevenue } from "../controllers/dashboardController.js";

const router = express.Router();


router.get("/revenue", getRevenue);



export default router;