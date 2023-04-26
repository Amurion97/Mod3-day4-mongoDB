"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const SongSchema = new mongoose_1.Schema({
    songTitle: String,
    songURL: String,
    artist: [{
            type: String,
            ref: 'Artist'
        }],
    owner: {
        type: String,
        ref: 'User'
    },
});
const Song = (0, mongoose_1.model)('Song', SongSchema);
exports.Song = Song;
//# sourceMappingURL=song.js.map