import express from 'express';
import GroupService from '../services/GroupService';

const router = express.Router();

router.get('/', async (req: any, res: any) => {
    res.json(await GroupService.getGroups());
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

router.post('/', async (req: any, res: any) => {
    res.json(await GroupService.addGroup());
});

router.delete('/:id', (req: any, res: any) => {
    res.json();
});

router.put('/:id', (req: any, res: any) => {
    res.json();
});

export default router;