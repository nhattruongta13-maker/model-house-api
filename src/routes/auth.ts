import express, {Request, Response} from 'express'
import {createUser} from '../services/service'

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
        if (err.code == '23505'){
            return res.status(409).json({"error": "Email already exists"})
        }else{
            return res.status(500).json({"error": "Something unexpected happened"})
        }
    }
})

export default router