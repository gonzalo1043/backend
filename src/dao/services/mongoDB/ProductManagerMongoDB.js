import { Product } from "../../models/productMongoose.js"
import {randomUUID} from 'crypto'


export class ProductManagerMongoDB {

    async addProduct({title, description, price, status, category, thumbnail, code, stock}) {
        const _id = randomUUID()
        const product = await Product.create({_id, title, description, price, status, category, thumbnail, code, stock} )
        return product.toObject()
    }

    async getProducts(query = {}) {

        const opcionesDePaginacion = { 
            limit: query.limit || 10, 
            page: query.page || 1
        }

        if (!query.category && !query.sort && !query.stock) {
            return await Product.paginate({}, opcionesDePaginacion)
        } 
        if (query.category) {
            const criterioDeBusqueda = {category: query.category}
            return await Product.paginate(criterioDeBusqueda, opcionesDePaginacion)
        }
        if(query.stock) {
            const criterioDeBusqueda = {stock: query.stock}
            return await Product.paginate(criterioDeBusqueda, opcionesDePaginacion)
        }
        if (query.sort) {
            return await Product.aggregate([
                {$sort: {price: -1}}
            ])
        }
        } 

    async getProductById (id) {
        const busqueda = await Product.findById(id).lean()
        if (!busqueda) throw new Error ('El producto no existe')
        return busqueda
    }

    async modificarProductos(id, prodData) {
        const modificada = await Product.findByIdAndUpdate(id, 
            {$set: prodData},
            {new: true})
            .lean()
        if(!modificada) {
            throw new Error ('id no encontrado')
        } else if (prodData.id) {
            throw new Error ('error al actualizar: no se puede cambiar el id')
        } else {
            return modificada
        }
    }

    async deleteProducts(id) {
        const borrada = await Product.findByIdAndDelete(id).lean()
        if(!borrada) {
            throw new Error ('error al borrar: producto no encontrado')
        }
        return borrada
    }
}


