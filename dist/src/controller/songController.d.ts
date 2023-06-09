import { Request, Response } from "express";
declare class SongController {
    private songService;
    constructor();
    findAll: (req: Request, res: Response) => Promise<void>;
    findAllYours: (req: Request, res: Response) => Promise<void>;
    showCreateForm: (req: Request, res: Response) => Promise<void>;
    addSong: (req: Request, res: Response) => void;
    getURLByID: (req: Request, res: Response) => Promise<void>;
}
declare const _default: SongController;
export default _default;
