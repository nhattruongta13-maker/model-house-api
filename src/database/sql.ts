import {pool} from '../database/db'

export const findUserByEmail = async (email: any) => {
    const result = await pool.query(`
        SELECT id, email, password FROM users where email = $1`,
        [email])
    return result.rows[0]
}

export const insertUser = async (email: any, password: any) => {
    const result = await pool.query(`
        INSERT INTO users (email, password) VALUES ($1, $2)
        RETURNING id, email, created_at`,
        [email, password])
    return result.rows[0]
}