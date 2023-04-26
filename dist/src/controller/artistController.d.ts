import { Request, Response } from "express";
declare class ArtistController {
    private artistService;
    constructor();
    findByName: (req: Request, res: Response) => Promise<void>;
    getIDByName: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ArtistController;
export default _default;
