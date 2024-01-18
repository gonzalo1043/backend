import express from 'express'
import {PORT} from './config/serverConfig.js'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { sessions } from './middleware/session.js'
import { apiRouter } from './router/api/apirestRouter.js'
import autenticacion from './middleware/passport.js'
import { CNX_STR } from './config/config.js'
import cors from 'cors'


await mongoose.connect(CNX_STR)
console.log(`conectado a base de datos en: ${CNX_STR}`)

const app = express()


app.listen(PORT, () => {
    console.log('Conectado al puerto 8080')
})

app.use(cors)
app.use('/static', express.static('./static'))
app.use(sessions)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(autenticacion)

app.use('/api', apiRouter)






