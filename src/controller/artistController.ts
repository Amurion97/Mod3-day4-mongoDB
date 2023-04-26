import {Request, Response} from "express";
import artistService from "../service/artistService";

class ArtistController {
    private artistService;

    constructor() {
        this.artistService = artistService;
    }

    findByName = async (req: Request, res: Response) => {
        console.log("Searching artist by name for suggestions is accessed")
        let artistName = req.body['artist-name'];
        let artists = await this.artistService.getByName(artistName);
        // console.log(artists);
        res.send(JSON.stringify(artists.slice(0, 10)));
        // res.render('index', );
    }
    getIDByName = async (req: Request, res: Response) => {
        console.log("Get artistID by name to create is accessed")
        let artistName = req.body['artist-name'];
        // console.log(artistName)
        let artists = await this.artistService.getByExactName(artistName);
        // console.log(artists);
        if (artists.length > 0) {
            res.send(JSON.stringify(artists[0]));
        } else {
            res.send(JSON.stringify(await artistService.addArtist(artistName)));
        }
    }
}

export default new ArtistController();