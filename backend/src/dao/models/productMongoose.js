import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import {randomUUID} from 'crypto'


const productSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: randomUUID},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String},
    code: {type: String, required: true, unique: true},
    stock: {type: String, required: true},
}, {versionKey: false,
    strict: 'throw'})

    productSchema.plugin(mongoosePaginate)

export const Product = mongoose.model('product', productSchema)
