
import express from 'express'
import { createProduct, getAllProduct, updateAttributeProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/',getAllProduct)
router.put('/updateAtb/:productId/:attributeId', updateAttributeProduct)
export default router