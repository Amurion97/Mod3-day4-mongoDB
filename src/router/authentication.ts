import {Request, Response} from "express";

export async function isLogged (req: Request, res, next) {
    // console.log(req.session.user)
    try {
        req.session["isLogged"] = false;
        const response = await fetch(`http://127.0.0.1:1800/session/${req.cookies.sid}`);
        const jsonData = await response.json();
        console.log("data received:", jsonData);
        if (jsonData.success) {
            req.session["isLogged"] = true;
            req.session["UID"] = jsonData.UID;
            // console.log("req.session:", req.session)
        } else {
            req.session["isLogged"] = false;
            req.session["UID"] = "";
        }

    } catch (e) {
        console.error(e)
    }


    if (req.session["user"]) {
        req.session["isLogged"] = true;
    }
    next();
}

export async function loggingRedirect (req, res, next) {
    // console.log(req.session.user)
    console.log("req.session:", req.session)
    if (req.session["isLogged"]) {
        next()
    }
    else res.redirect(301, '/users/login');
}
