import express from 'express'
import {PORT} from './config/serverConfig.js'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { sessions } from './middleware/session.js'
import { webRouter } from './router/web/webRouter.js'
import { apiRouter } from './router/api/apirestRouter.js'
import autenticacion from './middleware/passport.js'
import { MONGODB_CNX_STR } from './config/config.js'



await mongoose.connect(MONGODB_CNX_STR)
console.log(`conectado a base de datos en: ${MONGODB_CNX_STR}`)

const app = express()


app.listen(PORT, () => {
    console.log('Conectado al puerto 8080')
})


app.use('/static', express.static('./static'))
app.use(sessions)
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(autenticacion)

app.use('/', webRouter)
app.use('/api', apiRouter)






