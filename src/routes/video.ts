import express from 'express';
import { createVideo, getVideos, deleteVideo } from '../controllers/videoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/videos', authMiddleware, createVideo);
router.get('/videos', authMiddleware, getVideos);
router.delete('/videos/:id', authMiddleware, deleteVideo);

export default router;