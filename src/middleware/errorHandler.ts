import {Request, Response, NextFunction} from 'express'
import {AuthError} from '../error'
import {logger} from '../lib/logger'

const ERR_INVALID_CREDS = 'Invalid credentials'
const ERR_INTERNAL = 'Something unexpected happened'
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AuthError){
        return res.status(401).json({error: ERR_INVALID_CREDS})
    }
    logger.error({err,
                  requestId: req.params.id,
                  path: req.path,
                  method: req.method
    })
    return res.status(500).json({error: ERR_INTERNAL})
}