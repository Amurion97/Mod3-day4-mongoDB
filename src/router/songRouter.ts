import {Router} from "express";
import songController from "../controller/songController";
import {isLogged, loggingRedirect} from "./authentication";


const songRouter = Router();
songRouter.get('/', songController.findAll);
songRouter.get('/create',loggingRedirect, songController.showFormAdd);
songRouter.post('/create', songController.addSong);
songRouter.get("/your-songs",loggingRedirect, songController.findAllYours)
export default songRouter;