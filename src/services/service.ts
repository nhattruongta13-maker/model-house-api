import bcrypt from 'bcrypt'
import {findUserByEmail, insertUser} from '../database/sql'
import jwt  from 'jsonwebtoken'
import {StringValue} from 'ms'
import {AuthError} from '../error'

export const createUser = async (email: any, password: any) => {
    const SALT_ROUNDS = 10 
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await insertUser(email, password_hash)
    return newUser
}


export const loginUser = async (email: any, password: any) => {
    const user = await findUserByEmail(email)
    const DUMMY_HASH = "$2b$10$WcK4H8vQJ8qJ7m5wZ9xL0eK5nR8tY2uI3oP6aS9dF1gH4jK7lM0pQ"
    const hashToCheck = user?.password?? DUMMY_HASH
    const match = await bcrypt.compare(password, hashToCheck)

    if (!match || !user){
        throw new AuthError()
    }else{
        const expiry = (process.env.JWT_EXPIRES_IN || '7d') as StringValue
        const payload = {userId: user.id,
                        email: user.email
        }
        const token = await jwt.sign(payload, 
                            process.env.JWT_SECRET!,
                            {expiresIn: expiry})
    return token
    }
}