import passport from 'passport'

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

const autenticacion = (req, res, next) => {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}

export default autenticacion