import {Request, Response} from "express";
import categoryService from "../service/CategoryService";
import songService from "../service/songService";

class SongController {
    private songService;
    private categoryService;

    constructor() {
        this.songService = songService;
        this.categoryService = categoryService;
    }

    findAll = async (req: Request, res: Response) => {
        console.log("All songs accessed")
        // let isLogged = false;
        // if (req.session['user']) {
        //     isLogged = true;
        // }
        let songList = await this.songService.getAll();
        // console.log("listProduct:", songList)
        res.render('songs/songList', {songListName: "All songs", songList: songList, isLogged: req.session["isLogged"]});
    }

    findAllYours = async (req: Request, res: Response) => {
        // if (req.session['user']) {
            console.log("Your songs accessed by userID:", req.session['user']._id);
            let userID = req.session['user']._id;
            // console.log(userID)
            let songList = await this.songService.getByOwner(userID);
            // console.log("your song list:", songList)
            res.render('songs/yourSongList', {songListName: "Your songs", songList: songList, isLogged: req.session["isLogged"]});
        // } else {
        //     console.log("Your songs rejected")
        //     res.redirect(301, '/users/login');
        // }
    }

    showFormAdd = async (req: Request, res: Response) => {
        // if (req.session['user']) {
            console.log("Create songs accessed by userID:", req.session['user']._id)
            res.render('songs/create',{isLogged: req.session["isLogged"]});
        // } else {
        //     console.log("Create song rejected");
        //     res.redirect(301, '/users/login');
        // }
    }

    addSong = (req: Request, res: Response) => {
        if (req.session['user']) {
            console.log("Add song by post accessed by userID:", req.session['user']._id);
            req.body.artist = (JSON.parse(req.body.artist));
            console.log(req.body);
            req.body["owner"] = req.session['user']._id;
            this.songService.add(req.body);
            res.redirect(301, '/songs/your-songs')
        }
    }

    getURLByID = async (req: Request, res: Response) => {
        console.log("Get song URL by ID to create is accessed")
        let songID = req.body['song-id'];
        console.log(req.body)
        let song = await songService.getByID(songID);
        console.log(song, songID)
        // console.log(artists);
        if (song) {
            res.send(JSON.stringify(song));
        } else {
            res.send(JSON.stringify(undefined));
        }
    }
}

export default new SongController();