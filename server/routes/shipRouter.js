import { Router } from 'express';
import { createShip, deleteShip, getAllShipOptions, getShipById, updateShip } from '../controllers/shipController.js';

const router = Router();

router.get('/', getAllShipOptions);
router.get('get/:id', getShipById);
router.post('/add', createShip);
router.put('/update/:id', updateShip);
router.delete('delete/:id', deleteShip);

export default router;