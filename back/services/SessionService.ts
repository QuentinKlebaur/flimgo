import SessionRepository from '../repositories/SessionRepository';
import { SessionInput } from '../inputs/inputs';
import { SessionOutput } from '../outputs/outputs';
import { Session, UserSessionRelation } from '@prisma/client';
import { StatusError } from '../error/StatusError';

class SessionService {
    static async getSessions() : Promise<SessionOutput[]> {
        return (await SessionRepository.getSessions()).map((model: Session) => new SessionOutput(model));
    }

    static async getSessionsByGroupId(groupId: string) : Promise<SessionOutput[]> {
        return (await SessionRepository.getSessionsByGroupId(groupId)).map((model: Session) => new SessionOutput(model));
    }

    static async getSessionById(sessionId: string) : Promise<SessionOutput> {
        let session: Session
        try {
            session = await SessionRepository.getSessionById(sessionId);
        } catch {
            throw new StatusError(404, `Session not found`);
        }
        return new SessionOutput(session);
    }

    static async createSession(input: SessionInput, groupId: string) : Promise<SessionOutput> {
        return new SessionOutput(await SessionRepository.createSession(input, groupId));
    }

    static async updateSessionById(input: SessionInput, sessionId: string) : Promise<SessionOutput> {
        let session: Session
        try {
            session = await SessionRepository.getSessionById(sessionId);
        } catch {
            throw new StatusError(404, `Session not found`);
        }

        session.flimTitle = input.title;
        return new SessionOutput(await SessionRepository.updateSession(session))
    }

    static async removeSessionById(sessionId: string) {
        try {
            await SessionRepository.deleteSessionById(sessionId)
        } catch {
            throw new StatusError(404, `Session not found`)
        }
    }

    static async addUserToSession(userId: string, sessionId: string) {
        try {
            await SessionRepository.createSessionUserRelation(userId, sessionId)
        } catch {
            throw new StatusError(400, `Session not found or user already belongs to the session`)
        }
    }

    static async removeUserFromSession(userId: string, sessionId: string) {
        try {
            await SessionRepository.removeSessionUserRelation(userId, sessionId);
        } catch {
            throw new StatusError(400, `Session not found or user does not belong to the session`)
        }
    }

    static async updateSessionUserRelation(userId: string, sessionId: string, checked: boolean) {
        let relation: UserSessionRelation
        try {
            relation = await SessionRepository.getSessionUserRelation(userId, sessionId)
        } catch {
            throw new StatusError(404, `Session not found`)
        }
        relation.checked = checked
        await SessionRepository.updateSessionUserRelation(relation)
    }
}

export default SessionService;