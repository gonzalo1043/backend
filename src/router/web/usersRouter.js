// import {Router} from 'express'
// import { loggedInOnlyApi } from '../../middleware/auth.js'
// import { usersManager } from '../../dao/models/UsersMongoose.js'
// import { hashear } from '../../utils/criptografia.js'

// export const usersRouter = Router()

// usersRouter.get('/register', function registerView(req, res) {
//     res.render('register.handlebars', {
//       pageTitle: 'Registro'
//     })
//   })

// //registro

// usersRouter.post('/register', async function registrarUsuario(req, res) {
//     let newUser
//     try {
//         req.body.password = hashear(req.body.password)

//         newUser = await userManager.create(req.body)

//         res.redirect('/login')
//     } catch (error) {
//         console.log(error)
//         res.redirect('/register')
//     }

//     const userData = {
//         email: newUser.email,
//         name: newUser.name,
//         lastname: newUser.lastname,
//       }
    
//     req.login(userData, error => {
//         if (error) {
//             return res.redirect('/register')
//         }
//         res.redirect('/profile')
//     })  
// })

// //restablecer contraseña
// usersRouter.get('/resetpassword', function resetPasswordView(req, res) {
//     res.render('resetpassword.handlebars', {
//         pageTitle: 'Reestablecer contraseña'
//     })
// })

// usersRouter.post('/resetpassword', async function resetPassword(req, res) {
//     try {
//         req.body.password = hashear(req.body.password)

//         const updated = await userManager.findOneAndUpdate(
//             {email: req.body.email},
//             {$set: {password: req.body.password}},
//             {new: true}
//         ).lean()

//         if(!updated) {
//             console.log('usuario no encontrado')
//         } else {
//             console.log(actualizado)
//         }

//         res.redirect('/login')
//     } catch (error) {
//         console.log(error)
//     res.redirect('/resetpassword')
//     }
// })

// //perfil

// usersRouter.get('/profile', loggedInOnlyApi, async function profileView(req, res) {
//     res.render('profile.handlebars', {
//         pageTitle: 'Perfil',
//         user: req.user,
//     })
// })

