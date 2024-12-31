import { PrismaClient, Tile, Prisma } from '@prisma/client'
import { StatusError } from '../error/StatusError';
import { TileInput } from '../inputs/inputs';

const prisma = new PrismaClient()

class TileRepository {
    static async createTile(input: TileInput, groupId: string, userId?: string) : Promise<Tile> {
        let tile: Prisma.TileUncheckedCreateInput = {
            text: input.text,
            groupId: groupId,
            userId: userId
        }
        return await prisma.tile.create({ data: tile })
    }

    static async updateTile(model: Tile) : Promise<Tile> {
        return await prisma.tile.update({
            where: { id: model.id },
            data: model
        })
    }

    static async deleteTileById(id: string) {
        await prisma.tile.delete({
            where: { id: id },
        })
    }

    static async getTileById(id: string) : Promise<Tile> {
        let tile: Tile | null = await prisma.tile.findFirst({
            where: { id: id }
        })
        if (tile == null)
            throw new StatusError(404, 'Tile not found')
        return tile
    }

    static async getTiles() : Promise<Tile[]> {
        return await prisma.tile.findMany()
    }

    static async getTilesByGroupId(groupId: string) : Promise<Tile[]> {
        return await prisma.tile.findMany({
            where: { groupId: groupId }
        })
    }

    static async getTilesByGroupIdAndUsersId(groupId: string, userIds: string[]) : Promise<Tile[]> {
        let array: {userId: string | null}[] = userIds.map((userId) => { return { userId: userId } })
        array.push({ userId: null })
        return await prisma.tile.findMany({
            where: {
                groupId: groupId,
                OR: array
            }
        })
    }

    static async getTilesByUserId(userId: string) : Promise<Tile[]> {
        return await prisma.tile.findMany({
            where: { userId: userId }
        })
    }

    static async getTilesByUserAndGroupId(userId: string, groupId: string) : Promise<Tile[]> {
        return await prisma.tile.findMany({
            where: { userId: userId, groupId: groupId }
        })
    }
}

export default TileRepository;