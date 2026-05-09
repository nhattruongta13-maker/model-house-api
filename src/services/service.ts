import bcrypt from 'bcrypt'
import {findUserByEmail, insertUser} from '../database/sql'
import jwt ,{SignOptions} from 'jsonwebtoken'
import {StringValue} from 'ms'

const SALT_ROUNDS = 10 
export const createUser = async (email: any, password: any) => {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await insertUser(email, password_hash)
    return newUser
}

const expiry = (process.env.JWT_EXPIRES_IN || '7d') as StringValue
export const loginUser = async (email: any, password: any) => {
    const user = await findUserByEmail(email)
    const payload = {userId: user.id,
                     email: user.email
    }
    const token = jwt.sign(payload, 
                           process.env.JWT_SECRET!,
                           {expiresIn: expiry})
}