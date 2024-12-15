import { User, Token, Prisma } from '@prisma/client';
import { UserInput, LoginInput } from '../inputs/inputs';
import { UserOutput, LoginOutput } from '../outputs/outputs';
import UserRepository from '../repositories/UserRepository';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import jsonwebtoken from 'jsonwebtoken';
import { StatusError } from '../error/StatusError';
const bcrypt = require('bcrypt');
import { isString } from 'node:util';
import { isStringObject } from 'node:util/types';
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

    static async login(input: LoginInput) : Promise<LoginOutput> {
        let user: User
        let token: Prisma.TokenUncheckedCreateInput;
        try {
            user = await UserRepository.getUserByEmail(input.email)
            if (!await bcrypt.compare(input.password, user.hashedPassword))
                throw new StatusError(404, "")
        } catch (e) {
            if (e instanceof StatusError && e.status == 404)
                throw new StatusError(401, "Email or password is invalid")
            else throw e
        }
        if (typeof process.env.SECRET === 'string') {
            token = {
                token: sign({}, process.env.SECRET, {}),
                validUntil: new Date(Date.now() + (24 * 60 * 60 * 1000)),
                userId: user.id
            }
        }
        else throw new StatusError(500, "Secret not provided");
        return new LoginOutput(await AuthenticationRepository.createToken(token));
    }
}

export default AuthenticationService;