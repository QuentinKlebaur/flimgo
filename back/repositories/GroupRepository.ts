import { PrismaClient, Group, Prisma } from '@prisma/client'
import { GroupInput } from '../inputs/inputs';
import { equal } from 'assert';

const prisma = new PrismaClient()

class GroupRepository {
    // Get
    static async getAllGroups() : Promise<Group[]> {
        return await prisma.group.findMany();
    }

    static async getGroupById(id: string) : Promise<Group> {
        const group = await prisma.group.findFirst({
            where: {
                id: {
                    equals: id
                }
            }
        });
        if (group == null) {
            throw "error";
        } else
            return group;
    }

    static async getGroupsByUserId(userId: string) : Promise<Group[]> {
        return await prisma.group.findMany({
            where: {
                userRel: {
                    some: {
                        userId: {
                            equals: userId
                            }
                        }
                    }
                }
            });
    }

    // Create
    static async createGroup(input: GroupInput) : Promise<Group> {
        let group: Prisma.GroupCreateInput

        group = {
            name: input.name
        }
        return await prisma.group.create({ data: group })
    }

    // Update
    static async updateGroupById(input: GroupInput, id: string) : Promise<Group> {
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

export default GroupRepository;