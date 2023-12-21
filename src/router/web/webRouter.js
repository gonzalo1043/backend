import { Router } from "express";
import { sessionRouter } from "./sessionRouter.js";
import { usersRouter } from "./usersRouter.js";
import { cartWebRouter } from "./cartWebRouter.js";
import { productsWebRouter } from "./productsWebRouter.js";

export const webRouter = Router()

webRouter.use(cartWebRouter)
webRouter.use(productsWebRouter)
webRouter.use(sessionRouter)
webRouter.use(usersRouter)

webRouter.get('/', (req, res) => { return res.redirect('/login') })