import GroupRepository from '../repositories/GroupRepository';
import { GroupInput } from '../inputs/inputs';
import { GroupOutput } from '../outputs/outputs';
import { Group } from '@prisma/client';

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
    static async createGroup(input: GroupInput) : Promise<GroupOutput> {
        return new GroupOutput(await GroupRepository.createGroup(input));
    }

    // Update
    static async updateGroupById(input: GroupInput, id: string) : Promise<GroupOutput> {
        return new GroupOutput(await GroupRepository.updateGroupById(input, id));
    }

    // Delete
    static async deleteGroupById(id: string) {
        await GroupRepository.deleteGroupById(id);
    }
}

export default GroupService;