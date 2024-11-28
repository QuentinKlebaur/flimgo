interface SessionModel {
    id: number;
    groupId: number;
    flimTitle: string;
    createdAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
}

export default SessionModel;