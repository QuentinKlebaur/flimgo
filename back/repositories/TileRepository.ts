import { PrismaClient, Tile, Prisma } from '@prisma/client'
import { StatusError } from '../error/StatusError';
import { TileInput } from '../inputs/inputs';

const prisma = new PrismaClient()

class TileRepository {
}

export default TileRepository;