import { UserOutput } from '../outputs/outputs';
import { User } from '@prisma/client';
import { StatusError } from '../error/StatusError';
import UserRepository from '../repositories/UserRepository';

class UserService {
    // Get
    static async getUsers() : Promise<UserOutput[]> {
        return (await UserRepository.getAllUsers()).map((model: User) => new UserOutput(model));
    }

    static async getUserById(userId: string) : Promise<UserOutput> {
        return await UserRepository.getUserById(userId);
    }
}

export default UserService;