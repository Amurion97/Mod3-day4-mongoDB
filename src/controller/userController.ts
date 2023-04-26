import {Request, Response} from "express";
import userService from "../service/userService";
import {IUser} from "../enitity/user";

class UserController {

    private userService;
    private regExPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,20})$/;
    private invalidPasswordMessage: string = "password must have 8-20 character, a-z A-Z 0-9 special-character(!@#$%^&*) are allowed, must include one of each type";

    constructor() {
        this.userService = userService;
    }

    showFormLogin = async (req: Request, res: Response) => {
        res.render('users/login');
    }

    showFormSignUp = async (req: Request, res: Response) => {
        res.render('users/register');
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUser(req.body);
        if(!user) {
            res.redirect(301, '/users/login')
        } else {
            // login logic to validate req.body.user and req.body.pass
            // would be implemented here. for this example any combo works

            // regenerate the session, which is good practice to help guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {}

                // store user information in session, typically a user id
                req.session['user'] = user;

                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return;
                    res.redirect(301, '/');
                })
            })
        }
    }

    logout = async (req: Request, res: Response, next) => {
        // logout logic
        // clear the user from the session object and save.
        // this will ensure that re-using the old session id
        // does not have a logged in user
        req.session['user'] = null;
        req.session["isLogged"] = null;
        req.session.save(function (err) {
            if (err) next(err)

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/')
            })
        })
    }

    checkUsername = async (req: Request, res: Response) => {
        console.log("Check valid username for registration is accessed")
        let username = req.body['username'];
        let artists: IUser = await userService.checkUsername(username);
        // console.log(artists);
        let isValid = !(artists);
        res.send(JSON.stringify(isValid));
        // res.render('index', );
    }
    checkPassword = async (req: Request, res: Response) => {
        console.log("Check valid password for registration is accessed")
        let password = req.body['password'];
        let isValid = this.regExPassword.test(password);
        res.send(JSON.stringify(isValid));
        // res.render('index', );
    }

    registerUser = async (req: Request, res: Response) => {
        console.log("Registration is accessed")
        let password = req.body['password'];
        let username = req.body['username'];
        let artists: IUser = await userService.checkUsername(username);
        let isValid = this.regExPassword.test(password) && !(artists);
        console.log(isValid)
        if (isValid) {
            await userService.createUser({username: username, password: password})
        }
        res.send(JSON.stringify(isValid));
    }

}

export default new UserController();