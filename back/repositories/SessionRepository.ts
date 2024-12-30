import { PrismaClient, Session, UserSessionRelation, Prisma } from '@prisma/client'
import { StatusError } from '../error/StatusError';
import { SessionInput } from '../inputs/inputs';

const prisma = new PrismaClient()

class SessionRepository {
    static async createSession(input: SessionInput, groupId: string) : Promise<Session> {
        let session: Prisma.SessionUncheckedCreateInput = {
            flimTitle: input.title,
            groupId: groupId
        }
        return await prisma.session.create({ data: session })
    }

    static async updateSession(model: Session) : Promise<Session> {
        return await prisma.session.update({
            where: { id: model.id },
            data: model
        })
    }

    static async deleteSessionById(id: string) {
        await prisma.session.delete({
            where: { id: id },
        })
    }

    static async getSessionById(id: string) : Promise<Session> {
        return await prisma.session.findFirstOrThrow({
            where: { id: id }
        })
    }

    static async getSessions() : Promise<Session[]> {
        return await prisma.session.findMany()
    }

    static async getSessionsByGroupId(groupId: string) : Promise<Session[]> {
        return await prisma.session.findMany({
            where: { groupId: groupId }
        })
    }

    static async getSessionUserRelation(userId: string, sessionId: string) : Promise<UserSessionRelation> {
        return await prisma.userSessionRelation.findFirstOrThrow({
            where: { userId: userId, sessionId: sessionId }
        })
    }

    static async createSessionUserRelation(userId: string, sessionId: string) {
        await prisma.userSessionRelation.create({
            data: {
                userId: userId,
                sessionId: sessionId,
                checked: false
            }
        })
    }

    static async removeSessionUserRelation(userId: string, sessionId: string) {
        await prisma.userSessionRelation.delete({
            where: {
                userId_sessionId: { userId: userId, sessionId: sessionId }
            }
        })
    }

    static async updateSessionUserRelation(model: UserSessionRelation) : Promise<UserSessionRelation> {
        return await prisma.userSessionRelation.update({
            where: { userId_sessionId: { userId: model.userId, sessionId: model.sessionId } },
            data: model
        })
    }
}

export default SessionRepository;