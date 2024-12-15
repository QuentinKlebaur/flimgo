import { PrismaClient, User, Prisma } from '@prisma/client'
import { UserInput } from '../inputs/inputs';
import { equal } from 'assert';
import { StatusError } from '../error/StatusError';
import { RoleValues } from '../services/RoleService';

const prisma = new PrismaClient()

class UserRepository {
    // Get
    static async getAllUsers() : Promise<User[]> {
        return await prisma.user.findMany();
    }

    static async getUserById(id: string) : Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                id: {
                    equals: id
                }
            }
        });
        if (user == null) {
            throw new StatusError(404, `User with id (${id}) does not exists`);
        } else
            return user;
    }

    static async getUserByEmail(email: string) : Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email
                }
            }
        });
        if (user == null) {
            throw new StatusError(404, `User with email (${email}) does not exists`);
        }
        return user;
    }

    static async getUserByUsername(username: string) : Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username
                }
            }
        });
        if (user == null) {
            throw new StatusError(404, `User with username (${username}) does not exists`);
        }
        return user;
    }

    // Create
    static async createUser(input: Prisma.UserCreateInput, roles: number = RoleValues.USER) : Promise<User> {
        return await prisma.user.create({
            data: {
                ...input,
                role: {
                    create: {
                        roles: roles
                    }
                }
            }
        })
    }

    // Delete
    static async deleteUserById(id: string) {
        await prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}

export default UserRepository;