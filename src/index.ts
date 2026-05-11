import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import {errorHandler} from './middleware/errorHandler'
import {requestId} from './middleware/requestId.d'
import {logger} from './lib/logger'


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(requestId)
app.use((req, res, next) => {
    req.log = logger.child({req_id: req.id})
    next()
})


app.use('/auth', authRoutes)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Backend running: http://localhost:${PORT}/db-test`)
})