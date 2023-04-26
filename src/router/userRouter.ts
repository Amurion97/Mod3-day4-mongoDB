import express, {Router} from "express";
import userController from "../controller/userController";

const userRouter = Router();
userRouter.get('/login', userController.showFormLogin);
userRouter.post('/login', express.urlencoded({ extended: false }), userController.login);
userRouter.all('/logout', userController.logout);

userRouter.get('/register', userController.showFormSignUp);
userRouter.post('/register', userController.registerUser);
userRouter.post('/check-valid-username', userController.checkUsername);
userRouter.post('/check-valid-password', userController.checkPassword);
export default userRouter;