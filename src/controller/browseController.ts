import {Request, Response} from "express";
import categoryService from "../service/CategoryService";
import songService from "../service/songService";

class BrowseController {
    private songService;
    private categoryService;

    constructor() {
        this.songService = songService;
        this.categoryService = categoryService;
    }

    showBrowse = async (req: Request, res: Response) => {
        // let isLogged = false;
        // if (req.session['user']) {
        //     isLogged = true;
        // }
        res.render('index', {isLogged: req.session["isLogged"]});
    }

}

export default new BrowseController();