import { Group, User, AuthenticationSession, Tile, Bingo, Prisma, GroupInvitation, Session } from '@prisma/client'
import { BingoTileRelationWithTile, BingoWithTiles } from '../repositories/BingoRepository';

export class SessionOutput {
    id: string;
    groupId: string;
    title: string;
    createdAt: Date;
    startedAt?: Date;
    finishedAt?: Date;

    constructor(model: Session) {
        this.id = model.id
        this.groupId = model.groupId
        this.title = model.flimTitle
        this.createdAt = model.createdAt
        if (model.startedAt)
            this.startedAt = model.startedAt
        if (model.finishedAt)
            this.finishedAt = model.finishedAt
    }
}

export class GroupOutput {
    id: string
    name: string
    createdAt?: Date

    constructor(model: Group) {
        this.id = model.id
        this.name = model.name
        this.createdAt = model.createdAt
    }
}

export class UserOutput {
    email: string
    username: string

    constructor(model: User) {
        this.email = model.email
        this.username = model.username
    }
}

export class LoginOutput {
    accessToken: string
    refreshToken: string

    constructor(model: AuthenticationSession) {
        this.accessToken = model.accessToken
        this.refreshToken = model.refreshToken
    }
}

export class GroupInvitationOutput {
    id: string
    groupId: string
    counter: number
    validity: Date
    canceled: boolean

    constructor(model: GroupInvitation) {
        this.id = model.id
        this.groupId = model.groupId
        this.counter = model.counter
        this.validity = model.validity
        this.canceled = model.canceled
    }
}

export class TileOutput {
    id: string
    groupId: string
    relatedUserId: string | null
    text: string
    createdAt: Date

    constructor(model: Tile) {
        this.id = model.id,
        this.groupId = model.groupId,
        this.relatedUserId = model.userId,
        this.text = model.text,
        this.createdAt = model.createdAt
    }
}

export class BingoOutput {
    id: string
    sessionId: string
    userId: string | null
    tiles?: TileOutput[]

    constructor(model: BingoWithTiles | Bingo) {
        this.id = model.id
        this.sessionId = model.sessionId
        this.userId = model.userId
            console.log(model)
        if ('tileRel' in model) {
            this.tiles = model.tileRel.map((t: BingoTileRelationWithTile) => new TileOutput(t.tile))
        }
    }
}