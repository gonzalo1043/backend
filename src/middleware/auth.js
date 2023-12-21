export function loggedInOnlyApi (req, res, next) {
    if(!req.isAuthenticated()) {
        return res.status(400).json({status:'error', message: 'necesita iniciar sesion'})
    }
    next()
}

export function loggedInOnlyWeb (req, res, next) {
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next()
} 