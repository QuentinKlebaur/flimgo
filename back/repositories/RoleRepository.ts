import { PrismaClient, Role, Prisma } from '@prisma/client'
import { UserInput } from '../inputs/inputs';
import { equal } from 'assert';
import { StatusError } from '../error/StatusError';

const prisma = new PrismaClient()

class RoleRepository {
    static async getUserRoleById(userId: string) : Promise<Role> {
        const role: Role | null = await prisma.role.findFirst({
            where: {
                user: {
                    id: userId
                }
            }
        });
        if (role == null) {
            throw new StatusError(404, `User has no roles`);
        } else
            return role;
    }

    static async getUserRoleByToken(token: string) : Promise<Role> {
        const role: Role | null = await prisma.role.findFirst({
            where: {
                user: {
                    tokens: {
                        some: {
                            token: token
                        }
                    }
                }
            }
        });
        if (role == null) {
            throw new StatusError(404, `User has no roles`);
        } else
            return role;
    }
}

export default RoleRepository;