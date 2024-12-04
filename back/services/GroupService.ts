import GroupRepository from '../repositories/GroupRepository';

class GroupService {
    static async getGroups() : Promise<any> {
        return await GroupRepository.getGroups();
    }

    static async addGroup() : Promise<any> {
        return await GroupRepository.createUser();
    }
}

export default GroupService;