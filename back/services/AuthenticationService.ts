import { User, AuthenticationSession, Prisma } from '@prisma/client';
import { UserInput, LoginInput, RefreshInput } from '../inputs/inputs';
import { UserOutput, LoginOutput } from '../outputs/outputs';
import UserRepository from '../repositories/UserRepository';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import jsonwebtoken from 'jsonwebtoken';
import { StatusError } from '../error/StatusError';
const bcrypt = require('bcrypt');
import { isString } from 'node:util';
import { isStringObject } from 'node:util/types';
import { promises } from 'node:dns';
const { sign, decode, verify } = jsonwebtoken;

class AuthenticationService {
    // Add
    static async register(input: UserInput) : Promise<UserOutput> {
        const salt: string = await bcrypt.genSalt();
        let emailAlreadyExists: boolean = true
        let usernameAlreadyExists: boolean = true
        let user: Prisma.UserCreateInput =  {
            email: input.email,
            username: input.username,
            hashedPassword: await bcrypt.hash(input.password, salt)
        }
        try {
            await UserRepository.getUserByEmail(input.email);
        } catch (e) {
            if (e instanceof StatusError && e.status == 404)
                emailAlreadyExists = false
            else
                throw e;
        }
        if (emailAlreadyExists)
            throw new StatusError(409, `Email (${input.email}) already exists`)
        try {
            await UserRepository.getUserByUsername(input.username);
        } catch (e) {
            if (e instanceof StatusError && e.status == 404)
                usernameAlreadyExists = false
            else
                throw e;
        }
        if (usernameAlreadyExists)
            throw new StatusError(409, `Username (${input.username}) already exists`)
        return await UserRepository.createUser(user);
    }

    static async generateNewSession(userId: string): Promise<LoginOutput> {
        let authSession: Prisma.AuthenticationSessionUncheckedCreateInput;
        if (typeof process.env.ACCESS_SECRET === 'string' && typeof process.env.REFRESH_SECRET === 'string') {
            authSession = {
                accessToken: sign({}, process.env.ACCESS_SECRET, {}),
                refreshToken: sign({}, process.env.REFRESH_SECRET, {}),
                accessValidUntil: new Date(Date.now() + (24 * 60 * 60 * 1000)),
                refreshValidUntil: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
                userId: userId
            }
        }
        else throw new StatusError(500, "Secret not provided");
        return new LoginOutput(await AuthenticationRepository.createToken(authSession));
    }

    static async refresh(input: RefreshInput) : Promise<LoginOutput>
    {
        let user: Prisma.UserGetPayload<{include: { authSessions: true };}>;
        let userSession: AuthenticationSession |undefined;
        try {
            user = await UserRepository.getUserByRefreshToken(input.refreshToken);
            userSession = user.authSessions.find((session: AuthenticationSession) => session.refreshToken == input.refreshToken && session.accessToken == input.accessToken)
            if (userSession == undefined)
                throw new StatusError(401, "Session is invalid")
        } catch (e) {
            if (e instanceof StatusError && e.status == 404)
                throw new StatusError(401, "Session is invalid")
            else throw e
        }
        if (new Date() > userSession.refreshValidUntil)
            throw new StatusError(401, "RefreshToken expired")
        return await this.generateNewSession(user.id);
    }

    static async login(input: LoginInput) : Promise<LoginOutput> {
        let user: User
        try {
            user = await UserRepository.getUserByEmail(input.email)
            if (!await bcrypt.compare(input.password, user.hashedPassword))
                throw new StatusError(404, "")
        } catch (e) {
            if (e instanceof StatusError && e.status == 404)
                throw new StatusError(401, "Email or password is invalid")
            else throw e
        }
        return await this.generateNewSession(user.id);
    }
}

export default AuthenticationService;