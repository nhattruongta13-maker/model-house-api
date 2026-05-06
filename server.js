import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
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
    console.log(`Backend running: http://localhost:${PORT}`)
})