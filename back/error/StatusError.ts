import { Request, Response } from 'express';
import { TypedRequest } from '../routes/Request';
import { waitForDebugger } from 'inspector';

export class StatusError {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }
}
