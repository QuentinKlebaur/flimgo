import express from 'express';
import UserService from '../services/UserService';

const router = express.Router();

router.get('/', UserService.getAllUsers);

export default router;