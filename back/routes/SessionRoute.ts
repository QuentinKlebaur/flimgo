import express from 'express';
import SessionService from '../services/SessionService';
import { CheckAccessMiddleware, ExceptionHandlerMiddleware } from '../middleware/middlewares';
import { TypedRequest } from './Request';
import { Request, Response } from 'express';
import { GroupRoleValues, RoleValues } from '../services/RoleService';
import { SessionInput } from '../inputs/inputs';

const router = express.Router();

router.get('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.getSessions());
        }
    )
]);

router.get('/all', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.getSessions());
        }
    )
]);

router.get('group/:groupId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.getSessionsByGroupId(req.params.groupId));
        }
    )
]);

router.get('/self', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(501).json({message: "Not implemented"});
        }
    )
]);

// TODO check if user is in the session
router.get('/:sessionId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.getSessionById(req.params.sessionId));
        }
    )
]);

router.get('/:name', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(501).json({message: "Not implemented"});
        }
    )
]);

router.post('/group/:groupId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.SESSION_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, SessionInput>, res: Response) => {
            res.status(200).json(await SessionService.createSession(req.body, req.params.sessionId));
        }
    )
]);

// TODO check if user is in the session
router.delete('/:sessionId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.SESSION_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.removeSessionById(req.params.sessionId));
        }
    )
]);

// TODO check if user is in the session
router.put('/:sessionId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN, GroupRoleValues.SESSION_MANAGEMENT])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, SessionInput>, res: Response) => {
            res.status(200).json(await SessionService.updateSessionById(req.body, req.params.sessionId));
        }
    )
]);

// TODO check if user is in the session
router.post('/:sessionId/join', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.addUserToSession(req.userId ? req.userId : "", req.params.sessionId));
        }
    )
]);

// TODO check if user is in the session
router.delete('/:sessionId/leave', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await SessionService.removeUserFromSession(req.userId ? req.userId : "", req.params.sessionId));
        }
    )
]);

export default router;