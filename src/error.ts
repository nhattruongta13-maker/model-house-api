export class AuthError extends Error{
    public statusCode: number
    public isOperational: boolean

    constructor(message: string = 'Invalid credentials') {
        super(message)
        this.name = 'authError'
        this.statusCode = 401
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}