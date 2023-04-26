import {model, Schema} from "mongoose";

export interface IArtist {
    artistName ?: string;
}

const ArtistSchema = new Schema<IArtist>({
    artistName : String,
});
// Virtual for author's URL
ArtistSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/artist/${this._id}`;
});

const Artist = model('Artist', ArtistSchema);

export {Artist};