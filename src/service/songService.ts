import {ISong, Song} from "../enitity/song";
import {IArtist} from "../enitity/artist";
import ArtistService from "./artistService";

class SongService {
    constructor() {
    }

    getAll = async () => {
        // let products:Array<ISong> = await Song.find();
        let products = await Song.find().populate('artist');
        // console.log("products2:", products);
        return products;
    }
    getByOwner = async (userID) => {
        // let products:Array<ISong> = await Song.find();
        let products = await Song.find({owner: userID}).populate('artist');
        // console.log("products2:", products);
        return products;
    }
    getByID = async (songID) => {
        // let products:Array<ISong> = await Song.find();
        let song = await Song.findOne({_id: songID});
        // console.log("products2:", products);
        return song;
    }

    add = async (product) => {
       await Song.create(product);
    }
}

export default new SongService();