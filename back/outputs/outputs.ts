import { Prisma } from '@prisma/client'

export class GroupOutput {
    id?: string
    name: string
    createdAt?: Date

    constructor(model: Prisma.GroupCreateInput) {
        this.id = model.id
        this.name = model.name
        if (model.createdAt instanceof Date)
            this.createdAt = model.createdAt
    }
}