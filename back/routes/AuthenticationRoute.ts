import express from 'express';
import UserService from '../services/AuthenticationService';

const router = express.Router();

router.post('/login', (req: any, res: any) => {
    res.json({});
});

router.post('/register', (req: any, res: any) => {
    res.json({});
});

router.put('/refresh', (req: any, res: any) => {
    res.json({});
});

router.put('/delete', (req: any, res: any) => {
    res.json({});
});

router.put('/delete/:id', (req: any, res: any) => {
    res.json({});
});

export default router;