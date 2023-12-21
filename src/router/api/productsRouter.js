import { Router } from "express";
// import { PRODUCTS_PATH } from "../src/config.js";
import { productManager } from "../../dao/services/ProductManager.js";

export const productsRouter = Router()


productsRouter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const page = req.query.page
    const sort = req.query.sort
    const category= req.query.category
    const stock = req.query.stock

    const products = await productManager.getProducts({limit, page, sort, category, stock})
    
    res.json(products)
})

productsRouter.get('/:id', async (req, res) => {
    try {
        const productosId = req.params.id
        const productWithId = await productManager.getProductById(productosId)
        res.json(productWithId)
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        res.json (await productManager.addProduct({...body}))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productUpdate = req.body
    
        res.json(await productManager.modificarProductos(productId, productUpdate ))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

productsRouter.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        
        res.json(await productManager.deleteProducts(productId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})
