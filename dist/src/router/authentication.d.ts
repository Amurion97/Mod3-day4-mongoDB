import { Request } from "express";
export declare function isLogged(req: Request, res: any, next: any): Promise<void>;
export declare function loggingRedirect(req: any, res: any, next: any): Promise<void>;
