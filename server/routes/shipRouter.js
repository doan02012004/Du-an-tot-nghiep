import { Router } from 'express';
import { createShip, deleteVolume, deleteWeight, getAllShip, getShipById, removeBranch, updateVolumeRate, updateWeightRate } from '../controllers/shipController.js';

const router = Router();

router.get('/', getAllShip);
// router.get('/admin', getAllShipAdmin);
router.get('/:id', getShipById);
router.post('/add', createShip);
// Cập nhật phí khối lượng (Weight Rate)
router.put('/:shipId/weights/:weightId', updateWeightRate);

// Cập nhật phí thể tích (Volume Rate)
router.put('/:shipId/volumes/:volumeId', updateVolumeRate);
// Route để xóa khối lượng
router.delete('/weight/:id', deleteWeight);

// Route để xóa thể tích
router.delete('/volume/:id', deleteVolume);

router.delete('/:id', removeBranch);

export default router;