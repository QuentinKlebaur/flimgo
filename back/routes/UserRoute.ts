import express from 'express';
import TileService from '../services/TileService';
import { CheckAccessMiddleware, ExceptionHandlerMiddleware } from '../middleware/middlewares';
import { TypedRequest } from './Request';
import { Request, Response } from 'express';
import { GroupRoleValues, RoleValues } from '../services/RoleService';
import UserService from '../services/UserService';

const router = express.Router();

router.get('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await TileService.getTiles());
        }
    )
]);

router.get('/self', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await UserService.getUserById(req.userId ? req.userId : ""));
        }
    )
]);

router.get('/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await UserService.getUserById(req.params.userId));
        }
    )
]);

export default router;