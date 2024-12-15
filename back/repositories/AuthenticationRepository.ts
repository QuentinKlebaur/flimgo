import { PrismaClient, Token, Prisma } from '@prisma/client'
import { UserInput } from '../inputs/inputs';
import { equal } from 'assert';

const prisma = new PrismaClient()

class AuthenticationRepository {
    // Get
    static async createToken(input: Prisma.TokenUncheckedCreateInput) : Promise<Token> {
        return await prisma.token.create({
            data: input
        })
    }
}

export default AuthenticationRepository;