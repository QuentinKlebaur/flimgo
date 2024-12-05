import express from 'express';
import { Request, Response } from 'express';
import { TypedRequest } from './Request';
import { GroupInput } from '../inputs/inputs';
import GroupService from '../services/GroupService';

const router = express.Router();

router.get('/', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(200).json(await GroupService.getGroups());
});

router.get('/all', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(200).json(await GroupService.getGroups());
});

router.get('/:id', async (req: Request, res: Response) => {
    res.status(200).json(await GroupService.getGroupById(req.params.id));
});

router.get('user/:userId', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(200).json(await GroupService.getGroupByUserId(req.params.userId));
});

router.get('/:name', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(501).json();
});

router.post('/', async (req: TypedRequest<{}, GroupInput>, res: Response) => {
    res.status(201).json(await GroupService.createGroup(req.body));
});

router.delete('/:id', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(200).json(await GroupService.deleteGroupById(req.params.id));
});

router.put('/:id', async (req: TypedRequest<{}, GroupInput>, res: Response) => {
    res.status(200).json(await GroupService.updateGroupById(req.body, req.params.id));
});

export default router;