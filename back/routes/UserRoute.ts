import express from 'express';
const router = express.Router();
import UserService from '../services/UserService';

router.get('/', UserService.getAllUsers);

export default router;