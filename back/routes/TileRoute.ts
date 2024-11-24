import express from 'express';
import TileService from '../services/TileService';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json();
});

router.get('/user/self', (req: any, res: any) => {
    res.json();
});

router.get('/group/:group_id', (req: any, res: any) => {
    res.json();
});

router.get('/group/:group_id/user/:user_id', (req: any, res: any) => {
    res.json();
});

router.get('/user/:user_id', (req: any, res: any) => {
    res.json();
});

router.post('/', (req: any, res: any) => {
    res.json();
});

router.delete('/:id', (req: any, res: any) => {
    res.json();
});

router.put('/:id', (req: any, res: any) => {
    res.json();
});

export default router;