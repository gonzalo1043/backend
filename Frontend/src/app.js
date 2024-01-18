import express from 'express'
import { engine } from 'express-handlebars'
import { webRouter } from './router/webRouter.js'




const PORT = 9090

const app = express()


app.listen(PORT, () => {
    console.log('Conectado al puerto ' + PORT)
})


app.use('/', express.static('./static'))
// app.use(sessions)
app.engine('handlebars', engine())
// app.set('pages', '/pages')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(autenticacion)

app.use('/', webRouter)
// app.use('/api', apiRouter)






