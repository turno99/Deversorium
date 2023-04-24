import express from 'express';
import { getHostels, createHostel, updateHostel, deleteHostel, getHostelByOwnerId, getHostelByHostelId } from '../controllers/hostels.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getHostels);
router.get('/o/:id',getHostelByOwnerId);
router.get('/h/:id',getHostelByHostelId);
router.post('/', auth, createHostel);
router.patch('/:id', auth, updateHostel);
router.delete('/:id', auth, deleteHostel);
export default router;