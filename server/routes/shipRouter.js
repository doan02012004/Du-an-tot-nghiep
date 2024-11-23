import { Router } from 'express';

const router = Router();

router.get('/', getAllShipOptions);
router.get('/:id', getShipOptionById);
router.post('/', createShipOption);
router.put('/:id', updateShipOption);
router.delete('/:id', deleteShipOption);

export default router;