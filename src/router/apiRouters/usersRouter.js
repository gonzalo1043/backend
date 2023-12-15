import {Router} from 'express'
import { userManager } from '../../dao/models/Users'
import { loggedInOnlyApi } from '../../middleware/session'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
    try {
        const user = await userManager.create(req.body)
        res.status(200).json({status: 'success', payload: user})
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message})
    }
})


usersRouter.get('/miperfil', loggedInOnlyApi, async (req, res) => {
    const user = await userManager.findOne({email: req.session['user'].email}, {password:0}).lean()
})

