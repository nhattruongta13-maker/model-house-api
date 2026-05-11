import pino from 'pino'

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    base: {
        pid: false,
        hostname: false
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: ['password', 'req.headers.authorization', 'token'],
        censor: '[Redacted]'
    },
    transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss'
        }
    } : undefined
})