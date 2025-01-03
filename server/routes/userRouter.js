import express from 'express'
import { add, changePassword, deleteHistoryUpdateUser, deleteToken, deleteUser, forgot, getAccount, getAllUser, getByIdUser, getHistoryUpdateUser, getHistoryUpdateUserById, login, logout, register, requestRefreshToken, resetPassword, updateUser, updateUserStatus, verifyResetToken } from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getByIdUser)
router.get('/getaccount/user', checkAuth, getAccount)
router.get('/getupdate/userhistory', getHistoryUpdateUser)
router.get('/history/:id', getHistoryUpdateUserById)
router.delete('/delete/:id', deleteUser)
router.delete('/delehistory/:id', deleteHistoryUpdateUser)
router.put('/update/status/:id', updateUserStatus)
router.post('/add', add)
router.put('/update/:id', updateUser)
router.post('/register', register)
router.post('/login', login)
router.post('/forgot', forgot)
router.post('/logout', logout)
router.post('/token/refresh', requestRefreshToken)
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset-password', resetPassword);
router.post('/change-password', checkAuth, changePassword);
router.delete('/removetoken', deleteToken)

export default router