import {Router} from 'express'
import { userManager } from '../../dao/models/Users.js'
import { hasheadasSonIguales } from '../../utils/criptografia.js'
import passport from 'passport'

export const sessionRouter = Router()

sessionRouter.get('/login', function loginView(req, res) {
    res.render('login.handlebars', {
        pageTitle: 'Login'
    })
})

sessionRouter.post('/login', async (req, res) => {
    
        const {email, password} = req.body

        let userData

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123' ) {
            userData = {
                email: 'emailadmin',
                name: 'admin',
                lastname: 'admin', 
                rol: 'admin'
            }
        } else {
            const user = await userManager.findOne({email}).lean()
    
            if(!user) {
                console.log('usuario no encontrado')
                return res.redirect('/login')
            }
    
            if(!hasheadasSonIguales(password, user.password)) {
                console.log('las contraseñas no coinciden')
                return res.redirect('/login')
            }
            userData = {
                name: user.name,
                lastname: user.lastname,
                email: user.email
            }
        }
        req.login(userData, error => {
            if (error) {
                return res.redirect('/login')
            }
            res.redirect('/profile')
        })
    })

sessionRouter.post('/logout', (req, res) => {
    req.logout(err => {
        if(err) {
            console.log(error)       
        }
        res.redirect('/login')
    })
})


//github

sessionRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

sessionRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
)




