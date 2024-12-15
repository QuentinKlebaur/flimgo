import GroupRepository from '../repositories/GroupRepository';
import { GroupInput } from '../inputs/inputs';
import { GroupOutput } from '../outputs/outputs';
import { Role } from '@prisma/client';
import RoleRepository from '../repositories/RoleRepository';

export enum RoleValues {
    USER = (1 << 0),
    ADMIN = (1 << 1)
}
class RoleService {
    // Get
    static async userHasRoleById(userId: string, roles: number[]) : Promise<boolean> {
        return true;
    }

    static async userHasRoleByToken(token: string, roles: number[]) : Promise<boolean> {
        const currentRoles: Role = await RoleRepository.getUserRoleByToken(token)

        for (let i: number = 0; i < roles.length; ++i) {
            if ((roles[i] & currentRoles.roles) == 0)
                return false
        }
        return true;
    }
}

export default RoleService;