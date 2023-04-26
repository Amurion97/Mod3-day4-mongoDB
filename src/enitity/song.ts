import {Schema, model} from 'mongoose';
import {IArtist} from "./artist";
import {Artist} from "./artist";
import {IUser} from "./user";

export interface ISong {
    songTitle?: string,
    songURL?: string,
    artist ?: Array<IArtist>,
    // contributors: Array<string>
    owner ?: IUser,
}

const SongSchema = new Schema<ISong>({
    songTitle: String,
    songURL: String,
    artist: [{
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'Artist'
    }],
    // contributors: [{
    //     type: String
    // }],
    owner:{
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'User'
    },
})

const Song = model('Song', SongSchema);
export { Song };

