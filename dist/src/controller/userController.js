"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    constructor() {
        this.regExPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,20})$/;
        this.invalidPasswordMessage = "password must have 8-20 character, a-z A-Z 0-9 special-character(!@#$%^&*) are allowed, must include one of each type";
        this.showFormLogin = async (req, res) => {
            res.render('users/login');
        };
        this.showFormSignUp = async (req, res) => {
            res.render('users/register');
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body);
            if (!user) {
                res.redirect(301, '/users/login');
            }
            else {
                req.session.regenerate(function (err) {
                    if (err) { }
                    req.session['user'] = user;
                    req.session.save(function (err) {
                        if (err)
                            return;
                        res.redirect(301, '/');
                    });
                });
            }
        };
        this.logout = async (req, res, next) => {
            req.session['user'] = null;
            req.session["isLogged"] = null;
            req.session.save(function (err) {
                if (err)
                    next(err);
                req.session.regenerate(function (err) {
                    if (err)
                        next(err);
                    res.redirect('/');
                });
            });
        };
        this.checkUsername = async (req, res) => {
            console.log("Check valid username for registration is accessed");
            let username = req.body['username'];
            let artists = await userService_1.default.checkUsername(username);
            let isValid = !(artists);
            res.send(JSON.stringify(isValid));
        };
        this.checkPassword = async (req, res) => {
            console.log("Check valid password for registration is accessed");
            let password = req.body['password'];
            let isValid = this.regExPassword.test(password);
            res.send(JSON.stringify(isValid));
        };
        this.registerUser = async (req, res) => {
            console.log("Registration is accessed");
            let password = req.body['password'];
            let username = req.body['username'];
            let artists = await userService_1.default.checkUsername(username);
            let isValid = this.regExPassword.test(password) && !(artists);
            console.log(isValid);
            if (isValid) {
                await userService_1.default.createUser({ username: username, password: password });
            }
            res.send(JSON.stringify(isValid));
        };
        this.userService = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map