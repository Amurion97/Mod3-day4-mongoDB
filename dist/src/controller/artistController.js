"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const artistService_1 = __importDefault(require("../service/artistService"));
class ArtistController {
    constructor() {
        this.findByName = async (req, res) => {
            console.log("Searching artist by name for suggestions is accessed");
            let artistName = req.body['artist-name'];
            let artists = await this.artistService.getByName(artistName);
            res.send(JSON.stringify(artists.slice(0, 10)));
        };
        this.getIDByName = async (req, res) => {
            console.log("Get artistID by name to create is accessed");
            let artistName = req.body['artist-name'];
            let artists = await this.artistService.getByExactName(artistName);
            if (artists.length > 0) {
                res.send(JSON.stringify(artists[0]));
            }
            else {
                res.send(JSON.stringify(await artistService_1.default.addArtist(artistName)));
            }
        };
        this.artistService = artistService_1.default;
    }
}
exports.default = new ArtistController();
//# sourceMappingURL=artistController.js.map