import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import {pool} from '../database/db'


export async function queryInsert (req: Request, res: Response)  {
    try{
        const {email, password, name} = req.body

        if (!email || !password){
            return res.status(400).json({error: 'Email and password required'})
        }
        const password_hash = await bcrypt.hash(password, 10)

        const result = await pool.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email, created_at`,
            [email, password_hash || null]
        )

        const newUser = result.rows[0]
        res.status(201).json({
            message: 'User created',
            user: newUser
        })
    }catch(err: any){
        if(err.code === '23505'){
            return res.status(409).json({
                error: 'Email already exists'
            })
        }

        console.error(err)
        res.status(500).json({
            error: 'Server error'
        })
    }
}

export async function querySatusCheck (req: Request,res: Response)  {
    try{
        const result = await pool.query('SELECT NOW()')
        res.json({db_time: result.rows[0].now, status: 'connected'})
    }catch(err){
        res.status(500).json({error: 'DB connection failed'})
    }
}


export function loginCheck(req: Request, res: Response)  {
    const {email, password} = req.body
    console.log('Login: ', email)

    if (email === 'test@test.com' && password === '123'){
        res.json({success: true, token: 'fake-jwt-123'})
    }else{
        res.status(401).json({success: false})
    }
}

