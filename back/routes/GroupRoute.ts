import express from 'express';
import GroupService from '../services/GroupService';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json();
});

router.get('/all', (req: any, res: any) => {
    res.json();
});

router.get('/self', (req: any, res: any) => {
    res.json();
});

router.get('/:id', (req: any, res: any) => {
    res.json();
});

router.get('/:name', (req: any, res: any) => {
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