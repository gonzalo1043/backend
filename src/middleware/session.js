import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR } from '../config/mongoDbConfig'

const store = connectMongo.create({
    mongoUrl: MONGODB_CNX_STR,
    // ttl: 60
})

export const sessions = session ({
    store, 
    secret: 'secretProyect',
    resave: true, 
    saveUninitialized: true
})

export function loggedInOnlyApi (req, res, next) {
    if(!req.session['user']) {
        res.status(400).json({status:'error', message: 'necesita iniciar sesion'})
    }
    next()
}

export function loggedInOnlyWeb (req, res, next) {
    if(!req.session['user']){
        // res.render('errorNotLoggedIn.handlebars')
        return res.redirect('/login')
    }
    next()
} 
