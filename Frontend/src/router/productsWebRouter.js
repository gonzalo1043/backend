// import { Router } from "express";
// import { Product } from "../../dao/models/productMongoose.js";

// export const productsWebRouter = Router()


// productsWebRouter.get('/', async (req, res, next) => {

//     const criterioDeBusqueda = {}

//     const opcionesDePaginacion = {
//         limit: req.query.limit || 10, 
//         page: req.query.page || 1,
//         lean: true // para que devuelva objetos literales, no de mongoose
//     }

//     let result = await Product.paginate(criterioDeBusqueda, opcionesDePaginacion)

//     // console.log(result)

//     const context = {
//         pageTitle: 'paginado',
//         hayDocs: result.docs.length > 0,
//         docs: result.docs,
//         limit: result.limit,
//         page: result.page,
//         totalPages: result.totalPages,
//         hasNextPage: result.hasNextPage,
//         nextPage: result.nextPage,
//         hasPrevPage: result.hasPrevPage,
//         prevPage: result.prevPage,
//         pagingCounter: result.pagingCounter,
//     }

//     res.render('index', context)
// })

// productsWebRouter.get('/products/:pid', async (req, res) => {
//     const productId = req.params.pid
//     const product = await Product.findById(productId).lean()
//     res.render('productsDetail.handlebars', {
//         pageTitle: 'producto',
//         product
//     })
// })



