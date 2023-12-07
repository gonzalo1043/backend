import {randomUUID} from 'crypto'
import { Cart } from '../../models/CartMongoose.js'
import { Product } from '../../models/productMongoose.js'


export class CartManagerMongoDB {

    async addCart(products) {
        const _id = randomUUID()
        const cart = await Cart.create({_id, products} )
        return cart.toObject()
    }

    async getCartById (id) {
        const busqueda = await Cart.findById(id).populate('products._id').lean()
        if (!busqueda) throw new Error ('El carrito no existe')
        return busqueda
    }

    async addProductToCart(cartId, productId) {
        const cartBuscado =  await Cart.findById(cartId).lean()
        const productBuscado = await Product.findById(productId).lean()
        
        if (!cartBuscado) throw new Error ('El carrito no existe')
        if (!productBuscado) throw new Error ('El carrito no existe')

        const productCart = cartBuscado.products.find(p => p._id === productId)
        console.log(productCart)
        if (!productCart) {
            const updatedCart = await Cart.findByIdAndUpdate(cartId, {
                $push: {products: {_id: productId, quantity: 1}}
            }, {new: true}).lean()

            return updatedCart
        } else {
            const updatedCart = await Cart.findOneAndUpdate({
                _id: cartId, 'products._id':productId
            }, {$inc: {'products.$.quantity':1}}, 
            {new: true})

            return updatedCart
        }
    }

    async deleteAllProductCart(cartId) {
        const cartExist = await Cart.findById(cartId)
        if (cartExist) {
            const productCartDelete = await Cart.findByIdAndUpdate(cartId, {
                $set: {'products' : []}
        })
        return productCartDelete
        } else {
            throw new Error ('error al borrar: carrito no encontrado')
        }
    }

    async deleteProductCart (cartId, productId) {
        const cartBuscado = await Cart.findById(cartId)
        const productExist = cartBuscado.products.find (p => p._id === productId)
        if (productExist) {
            const productCartDelete = await Cart.findOneAndUpdate({ 
                _id: cartId, 'products._id': productId
            }, {
                $unset: {'products.$._id':1, 'products.$.quantity':1}
            })
            return productCartDelete
        } else {
            throw new Error ('error al borrar: producto no encontrado')
        }
    }

    async updateCart (cartId, cartUpdate) {
        const cartExist = await Cart.findById(cartId)
        const productExist = await Product.findById(cartUpdate._id)
        const productCartExist = cartExist.products.find(p => p._id === cartUpdate._id)

        if(productCartExist) {
            const updatedCart = await Cart.findOneAndUpdate({
                _id: cartId, 'products._id':cartUpdate._id
            }, {$set: {'products.$.quantity': cartUpdate.quantity}}, 
            {new: true})

            return updatedCart
        }
        
        if(cartExist && productExist) {
            const cartUpdated = await Cart.findByIdAndUpdate(cartId, {
                $push: {products: cartUpdate}
            })
            
        return cartUpdated
        } 
        if(!cartExist) {
            throw new Error ('error al actualizar: el carrito no existe')
        }
        if(!productExist) {
            throw new Error ('error al actualizar: el producto no existe')
        }
    }

    async updateProductsCart (cartId, productId, cartProductUpdate) {
        const cartBuscado = await Cart.findById(cartId)
        const productExist = cartBuscado.products.find (p => p._id === productId)
        const quan = cartProductUpdate.quantity
        if (productExist) {
            const updatedProductCart = await Cart.findOneAndUpdate({
                _id: cartId, 'products._id':productId
            }, {$set: {'products.$.quantity': quan}}, 
            {new: true})

            return updatedProductCart
        }
    }
}


