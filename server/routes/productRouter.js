
import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getByIdProduct, updateAttributeProduct, updateInforProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/',getAllProduct)
router.put('/updateAtb/:productId/:attributeId', updateAttributeProduct)
router.put('/updateInfor/:productId', updateInforProduct)
router.delete('/:productId',deleteProduct),
router.get('/:productId',getByIdProduct)

export default router