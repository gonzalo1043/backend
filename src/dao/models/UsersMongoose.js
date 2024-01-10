import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'
import { hasheadasSonIguales, hashear } from '../../utils/criptografia.js'

const schema = new Schema({
  _id: { type: String, default: randomUUID },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  cart: { id: {type: String, required: true, ref: 'Cart'} },
  rol: { type: String, default: 'user' }
}, {
  versionKey: false,
  strict: 'throw',
  statics: {
    register: async (userData) => {
      userData.password = hashear(userData.password)
      const user = await model('users').create(userData)
      return user.toObject()
    },
    login: async ({ username, password }) => {
      const user = await model('users').findOne({ username })
      if (!user) { throw new Error('authentication error') }
      if (!hasheadasSonIguales({
        recibida: password,
        almacenada: user.password
      })) {
        throw new Error('authentication error')
      }
      return user.toObject()
    },

  }
})

export const usersManager = model('users', schema)