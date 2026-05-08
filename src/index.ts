import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import {pool} from './db'


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.get('/db-test', async (req: Request,res: Response) => {
    try{
        const result = await pool.query('SELECT NOW()')
        res.json({db_time: result.rows[0].now, status: 'connected'})
    }catch(err){
        res.status(500).json({error: 'DB connection failed'})
    }
})

async function create_table(){
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                email UNIQUE TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
                )`)
        
    }catch(err){
        console.error(err)
        
}
}
create_table()

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