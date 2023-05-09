import {Request, Response} from "express";
import categoryService from "../service/CategoryService";
import songService from "../service/songService";

class ChatController {
    private songService;
    private categoryService;

    constructor() {
        this.songService = songService;
        this.categoryService = categoryService;
    }

    findAll = async (req: Request, res: Response) => {
        console.log("Chat accessed")

        res.render('chat/chat', {
            isLogged: req.session["isLogged"]
        });
    }

    findAllYours = async (req: Request, res: Response) => {
        console.log("Your songs accessed by userID:", req.session['UID']);
        let userID = req.session['UID'];
        // console.log(userID)
        // let songList = await this.songService.getByOwner(userID);
        // console.log("your song list:", songList)
        // res.render('songs/yourSongList', {songListName: "Your songs", songList: songList, isLogged: req.session["isLogged"]});
        res.render('songs/yourSongList', {songListName: "Your songs", isLogged: req.session["isLogged"]});
    }

    showFormAdd = async (req: Request, res: Response) => {
        // if (req.session['user']) {
        console.log("Create songs accessed by userID:", req.session['UID'])
        res.render('songs/create', {isLogged: req.session["isLogged"]});
        // res.render('index',{isLogged: req.session["isLogged"]});
        // } else {
        //     console.log("Create song rejected");
        //     res.redirect(301, '/users/login');
        // }
    }

    addSong = (req: Request, res: Response) => {
        if (req.session['UID']) {
            console.log("Add song by post accessed by userID:", req.session['UID']);
            req.body.artist = (JSON.parse(req.body.artist));
            console.log(req.body);
            req.body["owner"] = req.session['UID'];
            this.songService.add(req.body);
            res.redirect(301, '/songs/your-songs')
        } else {
            res.json({
                message: "unauthorized access"
            })
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

export default new ChatController();