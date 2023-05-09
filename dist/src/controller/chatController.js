"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const songService_1 = __importDefault(require("../service/songService"));
class ChatController {
    constructor() {
        this.findAll = async (req, res) => {
            console.log("Chat accessed");
            res.render('chat/chat', {
                isLogged: req.session["isLogged"]
            });
        };
        this.findAllYours = async (req, res) => {
            console.log("Your songs accessed by userID:", req.session['UID']);
            let userID = req.session['UID'];
            res.render('songs/yourSongList', { songListName: "Your songs", isLogged: req.session["isLogged"] });
        };
        this.showFormAdd = async (req, res) => {
            console.log("Create songs accessed by userID:", req.session['UID']);
            res.render('songs/create', { isLogged: req.session["isLogged"] });
        };
        this.addSong = (req, res) => {
            if (req.session['UID']) {
                console.log("Add song by post accessed by userID:", req.session['UID']);
                req.body.artist = (JSON.parse(req.body.artist));
                console.log(req.body);
                req.body["owner"] = req.session['UID'];
                this.songService.add(req.body);
                res.redirect(301, '/songs/your-songs');
            }
            else {
                res.json({
                    message: "unauthorized access"
                });
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
exports.default = new ChatController();
//# sourceMappingURL=chatController.js.map