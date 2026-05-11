import {randomUUID} from 'crypto'
import {Request, Response, NextFunction} from 'express'
import {Logger} from 'pino'

declare global{
    namespace Express{
        interface Request{
            id: string
            log: Logger
        }
    }
}

export function requestId(req: Request, res: Response, next: NextFunction){
    req.id = req.headers['x-request-id'] as string || randomUUID()
    res.setHeader('X-Request-Id', req.id)
    next()
}