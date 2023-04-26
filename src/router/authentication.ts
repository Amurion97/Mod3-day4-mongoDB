export function isLogged (req, res, next) {
    // console.log(req.session.user)
    if (req.session.user) {
        req.session["isLogged"] = true;
    }
    next();
}

export function loggingRedirect (req, res, next) {
    // console.log(req.session.user)
    if (req.session.user) {
        next()
    }
    else res.redirect(301, '/users/login');
}
