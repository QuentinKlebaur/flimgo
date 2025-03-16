import { StatusError } from "../error/StatusError"
import { Request, Response, NextFunction } from 'express';
import { TypedRequest } from '../routes/Request';
import RoleService from "../services/RoleService";
import UserRepository from "../repositories/UserRepository";
import AuthenticationRepository from "../repositories/AuthenticationRepository";
import { AuthenticationSession } from "@prisma/client";

export function ExceptionHandlerMiddleware(func: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next)
        } catch (e) {
            if (e instanceof StatusError)
                res.status(e.status).json({message: e.message})
            else {
                console.log(e)
                res.status(500).json({message: "Something went wrong"})
            }
        }
    }
}

export function CheckAccessMiddleware(roles: number[] = [], groupRoles: number[] = []) {
    return async (req: TypedRequest<{}, {}>, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == undefined)
            throw new StatusError(401, "No token")

        const userId: string = (await UserRepository.getUserByAcessToken(token)).id
        req.userId = userId;
        try {
            const session: AuthenticationSession = await AuthenticationRepository.getAuthSessionByAccessToken(token);

            if (new Date() > session.accessValidUntil)
                throw new StatusError(401, "AccessToken expired")
        } catch {
            throw new StatusError(401, "Invalid token")
        }
        if (roles.length)
            if (!await RoleService.userHasRoleById(userId, roles))
                throw new StatusError(401, "Check your roles")
        if (groupRoles.length || req.params.groupId)
            if (!await RoleService.userHasGroupRoleById(userId, req.params.groupId, groupRoles))
                throw new StatusError(401, "Check your group roles")
        next()
    }
}