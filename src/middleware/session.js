import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR } from '../config/mongoDbConfig.js'

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


