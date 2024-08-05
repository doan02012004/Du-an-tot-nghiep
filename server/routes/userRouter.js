import express from 'express'
import { deleteUser, getAllUser, getByIdUser, login, logout, register, requestRefreshToken, updateUser } from '../controllers/userController.js'
import { protectRoute } from '../middleware/checkAuth.js'
const router = express.Router()

router.get('/', protectRoute.verifyToken, getAllUser)
router.get('/:id', getByIdUser)
router.delete('/delete/:id', protectRoute.verifyTokenAndAdminAuth, deleteUser)
router.put('/update/:id', updateUser)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', protectRoute.verifyToken, logout)
router.post('/refresh', requestRefreshToken)
export default router