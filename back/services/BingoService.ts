import BingoRepository from '../repositories/BingoRepository';
import { BingoOutput } from '../outputs/outputs';
import { StatusError } from '../error/StatusError';
import { BingoWithTiles } from '../repositories/BingoRepository';
import { Bingo, BingoTileRelation } from '@prisma/client';

class BingoService {
    static async getBingos() : Promise<BingoOutput[]>
    {
        return (await BingoRepository.getBingos()).map((b: Bingo) => new BingoOutput(b));
    }

    static async getBingoById(bingoId: string) : Promise<BingoOutput>
    {
        try {
            return new BingoOutput(await BingoRepository.getBingoById(bingoId))
        } catch {
            throw new StatusError(404, "Bingo not found")
        }
    }

    static async getBingoByUserId(userId: string) : Promise<BingoOutput[]>
    {
        return (await BingoRepository.getBingosByUserId(userId)).map((b: Bingo) => new BingoOutput(b));
    }

    static async getBingoByUserAndSessionId(userId: string, sessionId: string) : Promise<BingoOutput>
    {
        try {
            return new BingoOutput(await BingoRepository.getBingosByUserAndSessionId(userId, sessionId))
        } catch {
            throw new StatusError(404, "Bingo not found")
        }
    }

    static async getBingosBySessionId(sessionId: string) : Promise<BingoOutput[]>
    {
        return (await BingoRepository.getBingosBySessionId(sessionId)).map((b: Bingo) => new BingoOutput(b));
    }

    static async changeTileCheck(bingoId: string, tileId: string, checked: boolean)
    {
        let model: BingoTileRelation = await BingoRepository.getBingoTileRelation(bingoId, tileId)

        if (checked == model.checked) {
            if (checked)
                throw new StatusError(400, "Tile already checked")
            else
                throw new StatusError(400, "Tile already unchecked")
        } else {
            model.checked = checked
            await BingoRepository.updateBingoTileRelation(model)
        }
    }
}

export default BingoService;