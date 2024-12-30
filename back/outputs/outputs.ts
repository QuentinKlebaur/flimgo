import { Group, User, AuthenticationSession, Tile, Prisma, GroupInvitation, Session } from '@prisma/client'

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
    hashedPassword: string

    constructor(model: User) {
        this.email = model.email
        this.username = model.username
        this.hashedPassword = model.hashedPassword
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