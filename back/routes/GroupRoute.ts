import express from 'express';
import { Request, Response } from 'express';
import { TypedRequest } from './Request';
import { GroupInput, GroupInvitationInput, RefreshInput } from '../inputs/inputs';
import GroupService from '../services/GroupService';
import { ExceptionHandlerMiddleware, CheckAccessMiddleware } from '../middleware/middlewares';
import { GroupRoleValues, RoleValues } from '../services/RoleService';

const router = express.Router();

router.get('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await GroupService.getGroupByUserId(req.userId ? req.userId : ""));
        }
    )
]);

router.get('/all', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await GroupService.getGroups());
        }
    )
]);

router.get('/:groupId',[
        ExceptionHandlerMiddleware(CheckAccessMiddleware()),
        ExceptionHandlerMiddleware(
            async (req: TypedRequest<{}, {}>, res: Response) => {
                res.status(200).json(await GroupService.getGroupById(req.params.groupId));
            }
        )
    ]
);

router.get('user/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware([RoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await GroupService.getGroupByUserId(req.params.userId));
        }
    )
]);

router.get('/:name', async (req: TypedRequest<{}, {}>, res: Response) => {
    res.status(501).json();
});

router.post('/', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, GroupInput>, res: Response) => {
            res.status(201).json(await GroupService.createGroup(req.body, req.userId ? req.userId : ""));
        }
    )
]);

router.delete('/:id', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, GroupInput>, res: Response) => {
            res.status(200).json(await GroupService.deleteGroupById(req.params.id));
        }
    )
]);

router.put('/:id', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, GroupInput>, res: Response) => {
            res.status(200).json(await GroupService.updateGroupById(req.body, req.params.id));
        }
    )
]);

// Invitations

router.post('/:groupId/invitation',[
    ExceptionHandlerMiddleware(CheckAccessMiddleware([], [GroupRoleValues.ADMIN])),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, GroupInvitationInput>, res: Response) => {
            res.status(201).json(await GroupService.createInvitation(req.body, req.params.groupId));
        }
    )
]
);

router.put('/join/:invitationId',[
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await GroupService.joinGroup(req.userId ? req.userId : "", req.params.invitationId));
        }
    )
]
);

router.delete('/:groupId/kick/:userId', [
    ExceptionHandlerMiddleware(CheckAccessMiddleware()),
    ExceptionHandlerMiddleware(
        async (req: TypedRequest<{}, {}>, res: Response) => {
            res.status(200).json(await GroupService.removeUserFromGroup(req.params.userid, req.params.groupId));
        }
    )
]);

export default router;