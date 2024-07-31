import express from 'express'
import { deleteUser, getAllUser, getByIdUser, login, logout, register, updateUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getByIdUser)
router.delete('/delete/:id', deleteUser)
router.put('/update/:id', updateUser)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
export default router