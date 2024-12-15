import express from 'express';
import { Request, Response } from 'express';
import { TypedRequest } from './Request';
import AuthenticationService from '../services/AuthenticationService';
import { LoginInput, UserInput } from '../inputs/inputs';
import { ExceptionHandlerMiddleware, CheckAccessMiddleware } from '../middleware/middlewares';
import { identity } from 'node-pg-migrate/dist/utils';
import { StatusError } from '../error/StatusError';
import { RoleValues } from '../services/RoleService';

const router = express.Router();

router.post('/login', [
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, LoginInput>, res: Response) => {
        res.status(201).json(await AuthenticationService.login(req.body));
    })
]);

router.post('/register',
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, UserInput>, res: Response) => {
        res.status(201).json(await AuthenticationService.register(req.body));
    })
);

router.put('/refresh', [
    ExceptionHandlerMiddleware(
        CheckAccessMiddleware([RoleValues.USER])
    ),
    async (req: TypedRequest<{}, {}>, res: Response) => {
        res.status(501).json();
}]);

router.put('/delete', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(501).json();
});

router.put('/delete/:id', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(501).json();
});

export default router;