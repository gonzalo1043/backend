import {Router} from 'express'
import express from 'express'
import { sessionsRouter } from './sessionRouter.js'
import { usersRouter } from './usersRouter.js'
import { cartRouter } from './cartRouter.js'
import { productsRouter } from './productsRouter.js'
import { metodosPersonalizados } from '../../middleware/metodosPersonalizados.js'
import { errorHandler } from '../../middleware/errorHandler.js'


export const apiRouter = Router()

apiRouter.use(metodosPersonalizados)


apiRouter.use('/session', sessionsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/carts', cartRouter )
apiRouter.use('/products', productsRouter)

apiRouter.use(errorHandler)