// import { Router } from "express";
// import { Cart } from "../../dao/models/CartMongoose.js";

// export const cartWebRouter = Router()

// cartWebRouter.get('/carts/:cid', async (req, res) => {
//     const cartId = req.params.cid
//     const cart = await Cart.findById(cartId).lean()

//     const cartProductId = cart.products.map(p => p._id)
//     const cartProductQuantity = cart.products.map(p => p.quantity)
//     console.log(cartProductId)
//     res.render('cartsDetail.handlebars', {
//         pageTitle: 'carrito',
//         cartId,
//         cartProductId,
//         cartProductQuantity
//     })
// })