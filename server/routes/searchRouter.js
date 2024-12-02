import express from 'express';
import { getPopularSearch, trackSearch} from '../controllers/searchController.js';
const router = express.Router();
router.get('/',getPopularSearch)
router.post('/add',trackSearch)
export default router;