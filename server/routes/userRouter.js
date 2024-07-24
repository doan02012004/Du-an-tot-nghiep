import express from 'express'
import { deleteUser, getAllUser, getByIdUser, register, updateUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getByIdUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)
router.post('/register', register)
export default router