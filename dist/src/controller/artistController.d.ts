import { NextFunction, Request, Response } from "express";
declare class ArtistController {
    private artistService;
    constructor();
    findByName: (req: Request, res: Response) => Promise<void>;
    getIDByName: (req: Request, res: Response) => Promise<void>;
    getAvatar: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
declare const _default: ArtistController;
export default _default;
