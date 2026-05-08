import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import {pool} from './db'
import bcrypt from 'bcrypt'


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.post('/register', async (req: Request, res: Response) => {
    try{
        const {email, password, name} = req.body

        if (!email || !password){
            return res.status(400).json({error: 'Email and password required'})
        }
        const password_hash = await bcrypt.hash(password, 10)

        const result = await pool.query(`
            INSERT INTO users (email, password_hash, name)
            VALUES ($1, $2, $3)
            RETURNING id, email, created`,
            [email, password, name || null]
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
})

app.get('/db-test', async (req: Request,res: Response) => {
    try{
        const result = await pool.query('SELECT NOW()')
        res.json({db_time: result.rows[0].now, status: 'connected'})
    }catch(err){
        res.status(500).json({error: 'DB connection failed'})
    }
})


app.get('/', (req: Request, res: Response) => {
    res.json({status: 'Model house API online🔥'})
})

app.post('/login', (req, res) => {
    const {email, password} = req.body
    console.log('Login: ', email)

    if (email === 'test@test.com' && password === '123'){
        res.json({success: true, token: 'fake-jwt-123'})
    }else{
        res.status(401).json({success: false})
    }
})

app.listen(PORT, () => {
    console.log(`Backend running: http://localhost:${PORT}/db-test`)
})