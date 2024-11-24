import express from 'express';
import ProfileService from '../services/ProfileService';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json();
});

router.get('/self', (req: any, res: any) => {
    res.json();
});

router.put('/self', (req: any, res: any) => {
    res.json();
});

router.put('/:id', (req: any, res: any) => {
    res.json();
});

export default router;