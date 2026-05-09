import bcrypt from 'bcrypt'
import {findUserByEmail, insertUser} from '../database/sql'

const SALT_ROUNDS = 10 
export const createUser = async (email: any, password: any) => {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await insertUser(email, password_hash)
    return newUser
}