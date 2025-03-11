import { PrismaClient, Bingo, BingoTileRelation, Prisma } from '@prisma/client'
import { StatusError } from '../error/StatusError';

const prisma = new PrismaClient()

export interface BingoTileRelationWithTile extends Prisma.BingoTileRelationGetPayload< {include: {tile: true}}> {}
export interface BingoWithTiles extends Prisma.BingoGetPayload<{include: { tileRel: {include: {tile: true}} }}> {
    [x: string]: any;
}

class BingoRepository {
    static async createBingo(userId: string, sessionId: string) : Promise<Bingo> {
        return await prisma.bingo.create({
            data: {
                userId: userId,
                sessionId: sessionId,
                validated: false
            }
        })
    }

    static async createBingos(userIds: string[], sessionId: string) : Promise<Bingo[]> {
        let bingos: Prisma.BingoUncheckedCreateInput[] = userIds.map(userId => {
            return {
                userId: userId,
                sessionId: sessionId,
                validated: false
            }
        })
        await prisma.bingo.createMany({
            data: bingos
        })
        return await prisma.bingo.findMany({
            where: {
                sessionId: sessionId
            }
        })
    }

    static async createBingoUserRelations(tileIds: string[], bingoId: string) {
        let i = 0
        let bingos: Prisma.BingoTileRelationUncheckedCreateInput[] = tileIds.map(tileId => {
            return {
                tileId: tileId,
                bingoId: bingoId,
                position: i++
            }
        })
        await prisma.bingoTileRelation.createMany({
            data: bingos
        })
    }

    static async updateBingoTileRelation(model: BingoTileRelation) {
        await prisma.bingoTileRelation.update({
            where: {
                bingoId_tileId: { bingoId: model.bingoId, tileId: model.tileId }
            },
            data: model
        })
    }

    static async getBingoById(id: string) : Promise<BingoWithTiles> {
        return await prisma.bingo.findFirstOrThrow({
            where: { id: id },
            include: {
                tileRel: {
                    include: {
                        tile: true
                    }
                }
            }
        })
    }

    static async getBingosByUserId(userId: string) : Promise<BingoWithTiles[]> {
        return await prisma.bingo.findMany({
            where: {
                userId: userId
            },
            include: {
                tileRel: {
                    include: {
                        tile: true
                    }
                }
            }
        })
    }

    static async getBingosByUserAndSessionId(userId: string, sessionId: string) : Promise<BingoWithTiles> {
        return await prisma.bingo.findFirstOrThrow({
            where: {
                userId: userId,
                sessionId: sessionId
            },
            include: {
                tileRel: {
                    include: {
                        tile: true
                    }
                }
            }
        })
    }

    static async getBingos() : Promise<BingoWithTiles[]> {
        return await prisma.bingo.findMany({
            include: {
                tileRel: {
                    include: {
                        tile: true
                    }
                }
            }
        })
    }

    static async getBingosBySessionId(sessionId: string) : Promise<BingoWithTiles[]> {
        return await prisma.bingo.findMany({
            where: {
                sessionId: sessionId
            },
            include: {
                tileRel: {
                    include: {
                        tile: true
                    }
                }
            }
        })
    }

    static async getBingoTileRelation(bingoId: string, tileId: string) : Promise<BingoTileRelation> {
        return await prisma.bingoTileRelation.findFirstOrThrow({
            where: {
                bingoId: bingoId,
                tileId: tileId
            }
        })
    }

    static async createBingoTileRelation(bingoId: string, tileId: string, position: number) {

        await prisma.bingoTileRelation.create({
            data: {
                bingoId: bingoId,
                tileId: tileId,
                position: position
            }
        })
    }
}

export default BingoRepository;