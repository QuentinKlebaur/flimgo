import { Group, User, Token, Prisma } from '@prisma/client'

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

    constructor(model: Token) {
        this.accessToken = model.token
    }
}