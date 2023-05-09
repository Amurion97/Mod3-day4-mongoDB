"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingRedirect = exports.isLogged = void 0;
async function isLogged(req, res, next) {
    try {
        req.session["isLogged"] = false;
        const response = await fetch(`http://127.0.0.1:1800/session/${req.cookies.sid}`);
        const jsonData = await response.json();
        console.log("data received:", jsonData);
        if (jsonData.success) {
            req.session["isLogged"] = true;
            req.session["UID"] = jsonData.UID;
        }
        else {
            req.session["isLogged"] = false;
            req.session["UID"] = "";
        }
    }
    catch (e) {
        console.error(e);
    }
    if (req.session["user"]) {
        req.session["isLogged"] = true;
    }
    next();
}
exports.isLogged = isLogged;
async function loggingRedirect(req, res, next) {
    console.log("req.session:", req.session);
    if (req.session["isLogged"]) {
        next();
    }
    else
        res.redirect(301, '/users/login');
}
exports.loggingRedirect = loggingRedirect;
//# sourceMappingURL=authentication.js.map