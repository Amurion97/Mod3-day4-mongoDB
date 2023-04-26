"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const song_1 = require("../enitity/song");
class SongService {
    constructor() {
        this.getAll = async () => {
            let products = await song_1.Song.find().populate('artist');
            return products;
        };
        this.getByOwner = async (userID) => {
            let products = await song_1.Song.find({ owner: userID }).populate('artist');
            return products;
        };
        this.getByID = async (songID) => {
            let song = await song_1.Song.findOne({ _id: songID });
            return song;
        };
        this.add = async (product) => {
            await song_1.Song.create(product);
        };
    }
}
exports.default = new SongService();
//# sourceMappingURL=songService.js.map