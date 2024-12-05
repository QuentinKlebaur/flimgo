import Express from 'express';
import { Query, Send } from 'express-serve-static-core';

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}