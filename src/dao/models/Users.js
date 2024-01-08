import mongoose from "mongoose"
import {randomUUID} from 'node:crypto'

const collection = 'Users'

const schema = new mongoose.Schema({
    _id: {type: String, default: randomUUID},
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String},
    lastname: {type: String, required: true},
}, {
    strict: 'throw',
    versionKey: false,
    methods: {
        infoPublica: function () {
            return {
                email: this.email,
                name: this.name,
                lastname: this.lastname,
            }
        }
    }
})

export const userManager = mongoose.model(collection, schema)
