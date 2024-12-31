import express from 'express';
import BingoService from '../services/BingoService';
import { CheckAccessMiddleware, ExceptionHandlerMiddleware } from '../middleware/middlewares';
import { TypedRequest } from './Request';
import { Request, Response } from 'express';
import { GroupRoleValues, RoleValues } from '../services/RoleService';

const router = express.Router();

router.get('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingos());
        }
    )
]);

router.get('/self', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingoByUserId(req.userId ? req.userId : ""));
        }
    )
]);

router.get('/:bingoId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingoById(req.params.bingoId));
        }
    )
]);

router.get('/session/:sessionId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingosBySessionId(req.params.sessionId));
        }
    )
]);

router.get('/session/:sessionId/user/self', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingoByUserAndSessionId(req.userId ? req.userId : "", req.params.sessionId));
        }
    )
]);

router.get('/session/:sessionId/user/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.getBingoByUserAndSessionId(req.params.userId, req.params.sessionId));
        }
    )
]);

router.put('/:bingoId/checkTile/:tileId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.changeTileCheck(req.params.bingoId, req.params.tileId, true));
        }
    )
]);

router.put('/:bingoId/uncheckTile/:tileId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await BingoService.changeTileCheck(req.params.bingoId, req.params.tileId, false));
        }
    )
]);

export default router;