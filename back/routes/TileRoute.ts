import express from 'express';
import TileService from '../services/TileService';
import { CheckAccessMiddleware, ExceptionHandlerMiddleware } from '../middleware/middlewares';
import { TypedRequest } from './Request';
import { Request, Response } from 'express';
import { GroupRoleValues, RoleValues } from '../services/RoleService';
import { TileInput } from '../inputs/inputs';

const router = express.Router();

router.get('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTiles());
        }
    )
]);

router.get('/:tileId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTileById(req.params.tileId));
        }
    )
]);

router.get('/user/self', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTilesByUserId(req.userId ? req.userId : ""));
        }
    )
]);

router.get('/group/:groupId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTilesByGroupId(req.params.groupId));
        }
    )
]);

router.get('/group/:groupId/user/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTilesByUserAndGroupId(req.params.userId, req.params.groupId));
        }
    )
]);

router.get('/user/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTilesByUserId(req.params.userId));
        }
    )
]);

router.post('/group/:groupId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.TILES_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, TileInput>, res: Response) => {
            res.status(201).json(await TileService.createTile(req.body, req.params.groupId, undefined));
        }
    )
]);

router.post('/group/:groupId/user/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.TILES_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        // Not catch when user does not exists + user not in group
        async (req: TypedRequest<{}, TileInput>, res: Response) => {
            res.status(201).json(await TileService.createTile(req.body, req.params.groupId, req.params.userId));
        }
    )
]);

router.delete('/:tileId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.TILES_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.removeTileById(req.params.tileId));
        }
    )
]);

router.put('/:tileId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.TILES_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, TileInput>, res: Response) => {
            res.status(200).json(await TileService.updateTileById(req.body, req.params.tileId));
        }
    )
]);

export default router;