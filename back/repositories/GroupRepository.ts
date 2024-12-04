import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class GroupRepository {
    static async createUser() : Promise<any> {
        let group: Prisma.GroupCreateInput
        group = {
            name: 'Super group'
          }
      return await prisma.group.create({ data: group })
    }

    static async getGroups() : Promise<any> {
        return await prisma.group.findMany();
    }
}

export default GroupRepository;