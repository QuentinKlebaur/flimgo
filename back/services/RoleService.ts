import GroupRepository from '../repositories/GroupRepository';
import { GroupInput } from '../inputs/inputs';
import { GroupOutput } from '../outputs/outputs';
import { Role, UserGroupRelModel } from '@prisma/client';
import RoleRepository from '../repositories/RoleRepository';

export enum RoleValues {
    ADMIN = (1 << 0)
}

export enum GroupRoleValues {
    ADMIN = (1 << 0)
}

class RoleService {
    // Get
    static async userHasRoleById(userId: string, roles: number[]) : Promise<boolean> {
        const currentRoles: Role = await RoleRepository.getUserRoleById(userId)

        return RoleService.userHasRole(currentRoles.roles, roles)
    }

    static async userHasRoleByToken(token: string, roles: number[]) : Promise<boolean> {
        const currentRoles: Role = await RoleRepository.getUserRoleByAcessToken(token)

        return RoleService.userHasRole(currentRoles.roles, roles)
    }

    static async userHasGroupRoleById(userId: string, groupId: string, roles: number[]) : Promise<boolean> {
        const currentRoles: UserGroupRelModel = await RoleRepository.getUserGroupRoleById(userId, groupId)

        return RoleService.userHasRole(currentRoles.roles, roles)
    }

    static userHasRole(currentRoles: number, roles: number[]) : boolean {
        if (roles.length == 0)
            return true
        for (let i: number = 0; i < roles.length; ++i) {
            if (roles[i] & currentRoles)
                return true
        }
        return false
    }
}

export default RoleService;