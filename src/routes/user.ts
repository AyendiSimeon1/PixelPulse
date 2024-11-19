import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

export default router;