"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const artist_1 = require("../enitity/artist");
const mongodb_1 = require("mongodb");
class ArtistService {
    constructor() {
        this.getAll = async () => {
            let artists = await artist_1.Artist.find();
            return artists;
        };
        this.getByName = async (artistName) => {
            let artists = await artist_1.Artist.find({ artistName: new RegExp(`${artistName}`, "i") });
            return artists;
        };
        this.getByID = async (artistID) => {
            let artists = await artist_1.Artist.findOne({ _id: new mongodb_1.ObjectId(artistID) });
            return artists;
        };
        this.getByExactName = async (artistName) => {
            let artists = await artist_1.Artist.find({ artistName: new RegExp(`\\b${artistName}\\b`, "i") });
            return artists;
        };
        this.addArtist = async (artistName) => {
            return await artist_1.Artist.create({ artistName: artistName });
        };
    }
}
exports.default = new ArtistService();
//# sourceMappingURL=artistService.js.map