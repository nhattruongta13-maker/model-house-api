import express, {Request, Response, NextFunction} from 'express'
import {createUser, loginUser} from '../services/service'
import {AuthError} from '../error'


const ERR_INVALID_CREDS = 'Invalid credentials'
const ERR_INTERNAL = 'Something unexpected happened'
const router = express.Router()
router.post('/signup', async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body

        if (!email || !password){
            return res.status(400).json({"error": "Email and password required!"})
        }

        const newUser = await createUser(email, password)
        return res.status(201).json({"msg": "Created completed",
                                     "user": newUser
        })
    }catch(err: any){
        if (err.code === '23505'){
            return res.status(409).json({"error": "Email already exists"})
        }else{
            return res.status(500).json({"error": ERR_INTERNAL})
        }
    }
})

router.post('/login', async (req: Request, res: Response, next:NextFunction) => {
    try{
        const {email, password} = req.body
        const token = await loginUser(email, password)
        if (!token) throw new AuthError()
    }catch(err){
        next(err)
    }
})

export default router