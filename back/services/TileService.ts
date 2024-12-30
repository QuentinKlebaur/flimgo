import TileRepository from '../repositories/TileRepository';
import RoleRepository from '../repositories/RoleRepository';
import { TileInput } from '../inputs/inputs';
import { TileOutput } from '../outputs/outputs';
import { Tile } from '@prisma/client';
import { StatusError } from '../error/StatusError';

class TileService {
    // Get
    static async getTiles() : Promise<TileOutput[]> {
        return (await TileRepository.getTiles()).map((model: Tile) => new TileOutput(model));
    }

    static async getTilesByUserId(userId: string) : Promise<TileOutput[]> {
        return (await TileRepository.getTilesByUserId(userId)).map((model: Tile) => new TileOutput(model));
    }

    static async getTilesByGroupId(groupId: string) : Promise<TileOutput[]> {
        return (await TileRepository.getTilesByGroupId(groupId)).map((model: Tile) => new TileOutput(model));
    }

    static async getTilesByUserAndGroupId(userId: string, groupId: string) : Promise<TileOutput[]> {
        return (await TileRepository.getTilesByUserAndGroupId(userId, groupId)).map((model: Tile) => new TileOutput(model));
    }

    static async getTileById(id: string) : Promise<TileOutput> {
        return new TileOutput(await TileRepository.getTileById(id));
    }

    // Add
    static async createTile(input: TileInput, groupId: string, userId?: string) : Promise<TileOutput> {
        if (userId != undefined)
            await RoleRepository.getUserGroupRoleById(userId, groupId);
        return new TileOutput(await TileRepository.createTile(input, groupId, userId));
    }

    // Update
    static async updateTileById(input: TileInput, tileId: string) {
        let tile: Tile = await TileRepository.getTileById(tileId);

        tile.text = input.text;
        await TileRepository.updateTile(tile);
    }

    // Remove
    static async removeTileById(tileId: string) {
        try {
            await TileRepository.deleteTileById(tileId);
        } catch {
            throw new StatusError(404, `Tile not found`);
        }
    }
}

export default TileService;