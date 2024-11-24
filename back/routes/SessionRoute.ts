import express from 'express';
import SessionService from '../services/SessionService';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.json();
});

router.get('/all', (req: any, res: any) => {
    res.json();
});

router.get('/:group_id', (req: any, res: any) => {
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

router.post('/player/:user_id', (req: any, res: any) => {
    res.json();
});

router.delete('/player/:user_id', (req: any, res: any) => {
    res.json();
});

export default router;