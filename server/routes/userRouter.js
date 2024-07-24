import express from 'express'
import { deleteUser, getAllUser, getByIdUser, updateUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/',getAllUser)
router.get('/:id',getByIdUser)
router.delete('/delete/:id',deleteUser)
router.put('/update/:id',updateUser)
export default router