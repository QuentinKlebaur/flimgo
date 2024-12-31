import SessionRepository from '../repositories/SessionRepository';
import TileRepository from '../repositories/TileRepository';
import BingoRepository from '../repositories/BingoRepository';
import { SessionInput } from '../inputs/inputs';
import { SessionOutput } from '../outputs/outputs';
import { Bingo, Session, Tile, UserSessionRelation } from '@prisma/client';
import { StatusError } from '../error/StatusError';
import { SessionWithUsers } from '../repositories/SessionRepository';

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
//        relation.checked = checked
        await SessionRepository.updateSessionUserRelation(relation)
    }

    static async startSession(sessionId: string) {
        let session: SessionWithUsers
        try {
            session = await SessionRepository.getSessionWithUsersById(sessionId)
        } catch {
            throw new StatusError(404, `Session not found`)
        }
        let participantIds: string[] = session.userRel.map((rel: UserSessionRelation) => rel.userId)
        const tiles: Tile[] = await TileRepository.getTilesByGroupIdAndUsersId(session.groupId, participantIds)
        if (tiles.length < 25)
            throw new StatusError(400, `Not enough tiles in the group. You need at least 25 tiles to start a session`)
        const bingos: Bingo[] = await BingoRepository.createBingos(participantIds, sessionId)
        for (let bingo of bingos) {
            let randomTiles: Tile[] = tiles.sort(() => Math.random() - 0.5).slice(0, 25)
            await BingoRepository.createBingoUserRelations(randomTiles.map(t => t.id), bingo.id)
        }
        session.startedAt = new Date()
        await SessionRepository.updateSession(session)
    }

    static async finishSession(sessionId: string) {
        let session: SessionWithUsers
        try {
            session = await SessionRepository.getSessionWithUsersById(sessionId)
        } catch {
            throw new StatusError(404, `Session not found`)
        }
        session.finishedAt = new Date()
        await SessionRepository.updateSession(session)
    }
}

export default SessionService;