import express from 'express';
import BingoService from '../services/BingoService';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json();
});

router.get('/self', (req: any, res: any) => {
    res.json();
});

router.get('/:id', (req: any, res: any) => {
    res.json();
});

router.put('/:id/check_tile/:tile_id', (req: any, res: any) => {
    res.json();
});

router.put('/:id/uncheck_tile/:tile_id', (req: any, res: any) => {
    res.json();
});

export default router;