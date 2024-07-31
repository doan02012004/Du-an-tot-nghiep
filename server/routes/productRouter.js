
import express from 'express'
import { createProduct, getAllProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/',getAllProduct)

export default router