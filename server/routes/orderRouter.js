import { Router } from "express";
import { createOrder } from "../controllers/orderControllers.js";


const router = Router();
router.get("/", );
router.post("/",createOrder );;

export default router;