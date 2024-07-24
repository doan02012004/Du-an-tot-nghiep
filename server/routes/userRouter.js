import express from 'express'
import { deleteUser, getAllUser, getByIdUser, register, updateUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/user',getAllUser)
router.get('/user/:id',getByIdUser)
router.delete('/user/delete/:id',deleteUser)
router.put('/user/update/:id',updateUser)
router.post('/register', register)
export default router