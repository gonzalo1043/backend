import express from 'express'
import { productsRouter } from './router/productsRouter.js'
import {PORT} from './config/serverConfig.js'
import { cartRouter } from './router/cartRouter.js'
import { MONGODB_CNX_STR } from './config/mongoDbConfig.js'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { productsWebRouter } from './router/webRouter/productsWebRouter.js'
import { cartWebRouter } from './router/webRouter/cartWebRouter.js'
import { Product } from './dao/models/productMongoose.js'



await mongoose.connect(MONGODB_CNX_STR)

// const dataSet = [ 
//     {title: 'Prueba', description: 'Pre entrega 2', price: 10, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 12, stock: 'SI' },
//     {title: 'Prueba2', description: 'Pre entrega 2', price: 100, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 123, stock: 'SI' },
//     {title: 'Prueba3', description: 'Pre entrega 2', price: 1000, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 124, stock: 'SI' },
//     {title: 'Prueba4', description: 'Pre entrega 2', price: 80, status: 'OK', category: 'PruebaCategoria', thumbnail: 'none', code: 125, stock: 'SI' },
//     {title: 'Prueba5', description: 'Pre entrega 2', price: 10000, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 126, stock: 'SI' },
//     {title: 'Prueba6', description: 'Pre entrega 2', price: 103, status: 'OK', category: 'PruebaCategoria', thumbnail: 'none', code: 127, stock: 'SI' },
//     {title: 'Prueba7', description: 'Pre entrega 2', price: 101, status: 'OK', category: 'PruebaCategoria', thumbnail: 'none', code: 128, stock: 'NO' },
//     {title: 'Prueba8', description: 'Pre entrega 2', price: 109, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 129, stock: 'NO' },
//     {title: 'Prueba9', description: 'Pre entrega 2', price: 1880, status: 'OK', category: 'PruebaCategoria', thumbnail: 'none', code: 312, stock: 'SI' },
//     {title: 'Prueba10', description: 'Pre entrega 2', price: 21210, status: 'OK', category: 'Prueba', thumbnail: 'none', code: 412, stock: 'SI' },
//     {title: 'Prueba11', description: 'Pre entrega 2', price: 25, status: 'OK', category: 'PruebaCategoria', thumbnail: 'none', code: 512, stock: 'NO' },
// ]

// console.log(await Product.insertMany(dataSet))
const app = express()

app.use(express.json())

app.use('/static', express.static('./static'))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')



app.use('/api', productsRouter)
app.use('/api', cartRouter)
app.use('/', productsWebRouter)
app.use('/', cartWebRouter)


app.listen(PORT, () => {
    console.log('Conectado al puerto 8080')
})

