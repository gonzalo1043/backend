import {Router} from 'express'
import express from 'express'
import { sessionRouter } from './sessionRouter'
import { usersRouter } from './usersRouter'
import { cartRouter } from './cartRouter'
import { productsRouter } from './productsRouter'


export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({extended: true}))

apiRouter.use('/session', sessionRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/carts', cartRouter )
apiRouter.use('/products', productsRouter)