import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    products: [{_id: {type: String, ref: 'product'}, quantity: Number}]
}, {versionKey: false,
    strict: 'throw'})

// cartSchema.pre('find', function (next) {
//     this.populate('product')
//     next()
// })

export const Cart = mongoose.model('cart', cartSchema)

