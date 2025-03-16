import { PrismaClient, AuthenticationSession, Prisma } from '@prisma/client'
import { UserInput } from '../inputs/inputs';
import { equal } from 'assert';
import { StatusError } from '../error/StatusError';

const prisma = new PrismaClient()

class AuthenticationRepository {
    // Post
    static async createToken(input: Prisma.AuthenticationSessionUncheckedCreateInput) : Promise<AuthenticationSession> {
        return await prisma.authenticationSession.create({
            data: input
        })
    }

    // Get
    static async getAuthSessionByAccessToken(accessToken: string) : Promise<AuthenticationSession> {
        const authSession = await prisma.authenticationSession.findFirstOrThrow({
            where: {
                accessToken: {
                    equals: accessToken
                }
            }
        });
        return authSession;
    }
}

export default AuthenticationRepository;