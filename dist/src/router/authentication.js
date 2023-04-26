"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingRedirect = exports.isLogged = void 0;
function isLogged(req, res, next) {
    if (req.session.user) {
        req.session["isLogged"] = true;
    }
    next();
}
exports.isLogged = isLogged;
function loggingRedirect(req, res, next) {
    if (req.session.user) {
        next();
    }
    else
        res.redirect(301, '/users/login');
}
exports.loggingRedirect = loggingRedirect;
//# sourceMappingURL=authentication.js.map