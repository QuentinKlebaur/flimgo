import { PrismaClient, Group, Prisma, GroupInvitation, UserGroupRelModel } from '@prisma/client'
import { GroupInput, GroupInvitationInput } from '../inputs/inputs';
import { equal } from 'assert';
import { GroupRoleValues } from '../services/RoleService';
import { StatusError } from '../error/StatusError';

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
    static async createGroup(input: GroupInput, creatorId: string) : Promise<Group> {
        let group: Prisma.GroupUncheckedCreateInput = {
            name: input.name,
            creatorId: creatorId
        }
        const groupModel: Group = await prisma.group.create({ data: group })
        await prisma.userGroupRelModel.create({
            data: {
                userId: creatorId,
                groupId: groupModel.id,
                roles: GroupRoleValues.ADMIN
            }
        })
        return groupModel
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

    // Inivtations
    static async createInvitation(input: GroupInvitationInput, groupId: string) : Promise<GroupInvitation> {
        return await prisma.groupInvitation.create({
            data: {
                validity: input.validityDate,
                counter: input.invitationCounter,
                groupId: groupId
            }
        })
    }

    static async getInvitationById(invitationId: string) : Promise<GroupInvitation> {
        const invitation: GroupInvitation | null = await prisma.groupInvitation.findFirst({
            where: {
                id: invitationId
            }
        })
        if (invitation == null)
            throw new StatusError(404, "Invitation not found")
        return invitation
    }

    static async createUserGroupRelation(userId: string, groupId: string) : Promise<UserGroupRelModel>
    {
        return await prisma.userGroupRelModel.create({
            data: {
                userId: userId,
                groupId: groupId,
                roles: 0
            }
        })
    }

    static async updateInvitation(model: GroupInvitation) : Promise<GroupInvitation>
    {
        return await prisma.groupInvitation.update({
            where: {
                id: model.id

            },
            data: {
                ...model
            }
        })
    }

    static async updateUserGroupRelation(model: UserGroupRelModel) : Promise<UserGroupRelModel>
    {
        return await prisma.userGroupRelModel.update({
            where: {
                userId_groupId: { userId: model.userId, groupId: model.groupId }

            },
            data: {
                ...model
            }
        })
    }

    static async removeUserGroupRelation(userId: string, groupId: string)
    {
        await prisma.userGroupRelModel.delete({
            where: {
                userId_groupId: { userId: userId, groupId: groupId }

            }
        })
    }
}

export default GroupRepository;