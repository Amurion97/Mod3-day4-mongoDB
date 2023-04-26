"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const songService_1 = __importDefault(require("../service/songService"));
class SongController {
    constructor() {
        this.findAll = async (req, res) => {
            console.log("All songs accessed");
            let songList = await this.songService.getAll();
            res.render('songs/songList', { songListName: "All songs", songList: songList, isLogged: req.session["isLogged"] });
        };
        this.findAllYours = async (req, res) => {
            console.log("Your songs accessed by userID:", req.session['user']._id);
            let userID = req.session['user']._id;
            let songList = await this.songService.getByOwner(userID);
            res.render('songs/yourSongList', { songListName: "Your songs", songList: songList, isLogged: req.session["isLogged"] });
        };
        this.showFormAdd = async (req, res) => {
            console.log("Create songs accessed by userID:", req.session['user']._id);
            res.render('songs/create', { isLogged: req.session["isLogged"] });
        };
        this.addSong = (req, res) => {
            if (req.session['user']) {
                console.log("Add song by post accessed by userID:", req.session['user']._id);
                req.body.artist = (JSON.parse(req.body.artist));
                console.log(req.body);
                req.body["owner"] = req.session['user']._id;
                this.songService.add(req.body);
                res.redirect(301, '/songs/your-songs');
            }
        };
        this.getURLByID = async (req, res) => {
            console.log("Get song URL by ID to create is accessed");
            let songID = req.body['song-id'];
            console.log(req.body);
            let song = await songService_1.default.getByID(songID);
            console.log(song, songID);
            if (song) {
                res.send(JSON.stringify(song));
            }
            else {
                res.send(JSON.stringify(undefined));
            }
        };
        this.songService = songService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new SongController();
//# sourceMappingURL=songController.js.map