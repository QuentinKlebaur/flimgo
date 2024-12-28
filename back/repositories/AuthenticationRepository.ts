import { PrismaClient, AuthenticationSession, Prisma } from '@prisma/client'
import { UserInput } from '../inputs/inputs';
import { equal } from 'assert';

const prisma = new PrismaClient()

class AuthenticationRepository {
    // Get
    static async createToken(input: Prisma.AuthenticationSessionUncheckedCreateInput) : Promise<AuthenticationSession> {
        return await prisma.authenticationSession.create({
            data: input
        })
    }
}

export default AuthenticationRepository;