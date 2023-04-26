"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artist = void 0;
const mongoose_1 = require("mongoose");
const ArtistSchema = new mongoose_1.Schema({
    artistName: String,
});
ArtistSchema.virtual("url").get(function () {
    return `/artist/${this._id}`;
});
const Artist = (0, mongoose_1.model)('Artist', ArtistSchema);
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map