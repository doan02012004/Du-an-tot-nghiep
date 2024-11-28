import express from 'express';
import { getPopularSearch} from '../controllers/searchController.js';
const router = express.Router();
router.get('/',getPopularSearch)
export default router;