import passport from 'passport'

import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/serverConfig.js'
import { usersManager } from '../dao/models/UsersMongoose.js'

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

const autenticacion = (req, res, next) => {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}


passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  console.log(profile)

  const usuario = await userManager.findOne({ email: profile.username })
  if (usuario) {
    return done(null, {
      ...usuario.infoPublica(),
      rol: 'usuario'
    })
  }

  try {
    const registrado = await userManager.create({
      email: profile.username,
      password: '(sin especificar)',
      name: profile.displayName,
      lastname: '(sin especificar)',
    })
    done(null, {
      ...registrado.infoPublica(),
      rol: 'usuario'
    })
  } catch (error) {
    done(error)
  }

}))


export default autenticacion