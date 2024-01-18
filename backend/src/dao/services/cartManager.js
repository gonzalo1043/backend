import { CartManagerMongoDB } from './mongoDB/cartManagerMongoDB.js';


// export const cartManager = new CartManagerArchivos('./db/product.json')

export const cartManager = new CartManagerMongoDB()