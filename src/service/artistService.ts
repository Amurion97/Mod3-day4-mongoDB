import {Artist} from "../enitity/artist";
import {Schema} from "mongoose";
import { ObjectId } from "mongodb";

class ArtistService {
    constructor() {
    }

    getAll = async () => {
        let artists = await Artist.find();
        return artists;
    }

    getByName = async (artistName) => {
        let artists = await Artist.find({artistName: new RegExp(`${artistName}`,"i")});
        // await Artist.insertMany([{artistName: `Gareth Coker`}]);
        return artists;
    }
    getByID = async (artistID) => {
        let artists = await Artist.findOne({_id: new ObjectId(artistID)});
        // await Artist.insertMany([{artistName: `Gareth Coker`}]);
        return artists;
    }
    getByExactName = async (artistName) => {
        // console.log(new RegExp(`\\b${artistName}\\b`,"i"))
        let artists = await Artist.find({artistName:  new RegExp(`\\b${artistName}\\b`,"i")});
        return artists;
    }

    addArtist = async (artistName) => {
        // console.log("added artist:",await Artist.insertMany([{artistName: artistName}]));
        return await Artist.create({artistName: artistName});
    }
}

export default new ArtistService();