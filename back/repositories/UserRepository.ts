import { PrismaClient, User, Prisma } from '@prisma/client'
import { GroupInput } from '../inputs/inputs';
import { equal } from 'assert';

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
            throw "error";
        } else
            return user;
    }

    // Create
    static async createGroup(input: GroupInput) : Promise<User> {
        let group: Prisma.GroupCreateInput

        group = {
            name: input.name
        }
        return await prisma.group.create({ data: group })
    }

    // Update
    static async updateGroupById(input: GroupInput, id: string) : Promise<Prisma.GroupCreateInput> {
        const group = prisma.group.update({
            where: {
                id: id
            },
            data: {
                name: input.name
            }
        })
        if (group == null) {
            throw "error";
        } else
            return group;
    }

    // Delete
    static async deleteGroupById(id: string) {
        await prisma.group.delete({
            where: {
                id: id
            }
        });
    }
}

export default UserRepository;