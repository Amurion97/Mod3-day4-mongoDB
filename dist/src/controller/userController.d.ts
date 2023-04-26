import { Request, Response } from "express";
declare class UserController {
    private userService;
    private regExPassword;
    private invalidPasswordMessage;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    showFormSignUp: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response, next: any) => Promise<void>;
    checkUsername: (req: Request, res: Response) => Promise<void>;
    checkPassword: (req: Request, res: Response) => Promise<void>;
    registerUser: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
