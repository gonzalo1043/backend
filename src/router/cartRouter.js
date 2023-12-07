import { Router } from "express";
import { cartManager } from '../dao/services/cartManager.js'

export const cartRouter = Router()


cartRouter.post('/carts', async (req, res) => {
try {
    res.json(await cartManager.addCart())
    
} catch (error) {
    res.status(400).json({ errorMessage : error.message})
}})

cartRouter.get('/carts/:cid', async(req, res) => {
    try {
        const cartId = req.params.cid
        res.json(await cartManager.getCartById(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.post('/carts/:cid/products/:pid', async(req, res) => {
    try {
        const cartId = req.params.cid
    
        const productId = req.params.pid
        // const product = await productManager.getProductById(productId)
    
        res.json(await cartManager.addProductToCart(cartId, productId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.delete('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        res.json(await cartManager.deleteAllProductCart(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.delete('/carts/:cid/products/:pid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const productId = req.params.pid
        res.json(await cartManager.deleteProductCart(cartId, productId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.put('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid 
        const cartUpdate = req.body
        res.json(await cartManager.updateCart(cartId, cartUpdate))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.put('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const cartProductUpdate = req.body
        res.json(await cartManager.updateProductsCart(cartId, productId, cartProductUpdate))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

// cartRouter.delete('/carts', async (req, res) => {
//     try {
//         res.json(await cm.deleteAll())
//     } catch (error) {
//         res.status(400).json({ errorMessage : error.message})
//     }
// }) 


