import { StatusError } from "../error/StatusError"
import { Request, Response, NextFunction } from 'express';
import RoleService from "../services/RoleService";

export function ExceptionHandlerMiddleware(func: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await func(req, res, next)
        } catch (e) {
            if (e instanceof StatusError)
                res.status(e.status).json({message: e.message})
            else
                res.status(500).json({message: "Something went wrong"})
        }
    }
}

export function CheckAccessMiddleware(roles: number[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == undefined)
            throw new StatusError(401, "No token")
        if (!await RoleService.userHasRoleByToken(token, roles))
            throw new StatusError(401, "Check your roles")
        else
            next()
    }
}