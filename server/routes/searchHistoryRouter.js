import express from 'express';
import { trackSearch } from '../controllers/searchHistoryController.js';
const router = express.Router();
// router.get('/:userId',getSearchHistoryByUser)
router.post('/add',trackSearch)
export default router;