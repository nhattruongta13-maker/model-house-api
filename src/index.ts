import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)



app.listen(PORT, () => {
    console.log(`Backend running: http://localhost:${PORT}/db-test`)
})