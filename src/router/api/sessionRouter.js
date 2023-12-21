import {Router} from 'express'
import { userManager } from '../../dao/models/Users.js'

export const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const {email, password} = req.body

    let userData

    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123' ) {
        userData = {
            email: 'emailadmin',
            name: 'admin',
            lastname: 'admin', 
            isAdmin: true

        }
    } else {
        const user = await userManager.findOne({email}).lean()

        if(!user) {
            return req.status(400).send('Login failed')
        }

        if(password !== user.password) {
            return res.status(400).send('Login failed')
        }
        userData = {
            name: user.name,
            lastname: user.lastname,
            email: user.email
        }
    }
    req.session['user'] = userData
    res.status(201).json({status: 'success', message: 'login success'})
})

sessionRouter.get('/', (req, res) => {
    if(req.session.user) {
        return res.json(req.session.user)
    }
    res.status(400).json({status: 'error', message: 'no hay una sesion iniciada'})
})


sessionRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.status(500).json({status: 'logout error', body: err})
        }
        res.json({status: 'success', message: 'Logout OK!'})
    })
})
