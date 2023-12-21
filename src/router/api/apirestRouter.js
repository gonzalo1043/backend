import {Router} from 'express'
import express from 'express'
import { sessionRouter } from './sessionRouter.js'
import { usersRouter } from './usersRouter.js'
import { cartRouter } from './cartRouter.js'
import { productsRouter } from './productsRouter.js'


export const apiRouter = Router()

apiRouter.use('/session', sessionRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/carts', cartRouter )
apiRouter.use('/products', productsRouter)