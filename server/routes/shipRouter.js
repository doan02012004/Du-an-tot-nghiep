import { Router } from 'express';
import { createShip, deleteShip, getAllShipAdmin, getAllShipClient, getShipById, updateShip } from '../controllers/shipController.js';

const router = Router();

router.get('/client', getAllShipClient);
router.get('/admin', getAllShipAdmin);
router.get('/:id', getShipById);
router.post('/add', createShip);
router.put('/update/:id', updateShip);
router.delete('/delete/:id', deleteShip);

export default router;