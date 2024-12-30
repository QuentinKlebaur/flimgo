import GroupRepository from '../repositories/GroupRepository';
import { GroupInput, GroupInvitationInput } from '../inputs/inputs';
import { GroupInvitationOutput, GroupOutput } from '../outputs/outputs';
import { Group, GroupInvitation, UserGroupRelation } from '@prisma/client';
import { StatusError } from '../error/StatusError';

class GroupService {
    // Get
    static async getGroups() : Promise<GroupOutput[]> {
        return (await GroupRepository.getAllGroups()).map((model: Group) => new GroupOutput(model));
    }

    static async getGroupByUserId(userId: string) : Promise<GroupOutput[]> {
        return (await GroupRepository.getGroupsByUserId(userId)).map((model: Group) => new GroupOutput(model));
    }

    static async getGroupById(id: string) : Promise<GroupOutput> {
        return new GroupOutput(await GroupRepository.getGroupById(id));
    }

    // Add
    static async createGroup(input: GroupInput, creatorId: string) : Promise<GroupOutput> {
        return new GroupOutput(await GroupRepository.createGroup(input, creatorId));
    }

    // Update
    static async updateGroupById(input: GroupInput, id: string) : Promise<GroupOutput> {
        return new GroupOutput(await GroupRepository.updateGroupById(input, id));
    }

    // Delete
    static async deleteGroupById(id: string) {
        await GroupRepository.deleteGroupById(id);
    }

    // Invitations
    static async createInvitation(input: GroupInvitationInput, groupId: string) : Promise<GroupInvitationOutput> {
        input.validityDate = new Date(Date.parse(input.validity))
        try {
            if ((new Date(input.validity)).getTime() < new Date().getTime())
                throw new StatusError(400, `Validity cannot be in the past`)
            return new GroupInvitationOutput(await GroupRepository.createInvitation(input, groupId))
        } catch (e: any) {
            console.log(e)
            throw new StatusError(404, `Group not found`)
        }
    }

    static async joinGroup(userId: string, invitationId: string) {
        let invitation: GroupInvitation = await GroupRepository.getInvitationById(invitationId)
        try {
            let userGroupRel: UserGroupRelation = await GroupRepository.getUserGroupRelation(userId, invitation.groupId)

            throw (new StatusError(400, `User already belongs to the group`))
        } catch {}

        if (invitation.counter == 0 || (new Date(invitation.validity)).getTime() < new Date().getTime()) {
            throw new StatusError(400, `This invitation has expired`)
        }
        try {
            await GroupRepository.createUserGroupRelation(userId, invitation.groupId)
        } catch {
            throw new StatusError(404, `Group or user not found`)
        }
        if (invitation.counter > 0) {
            invitation.counter -= 1;
            await GroupRepository.updateInvitation(invitation)
        }
    }

    static async removeUserFromGroup(userId: string, groupId: string)
    {
        try {
            GroupRepository.removeUserGroupRelation(userId, groupId)
        } catch {
            throw new StatusError(404, `Group or user not found`)
        }
    }
}

export default GroupService;