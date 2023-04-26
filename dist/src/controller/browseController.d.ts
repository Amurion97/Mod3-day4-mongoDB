import { Request, Response } from "express";
declare class BrowseController {
    private songService;
    private categoryService;
    constructor();
    showBrowse: (req: Request, res: Response) => Promise<void>;
}
declare const _default: BrowseController;
export default _default;
