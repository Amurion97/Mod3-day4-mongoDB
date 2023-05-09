import {Router} from "express";
import songController from "../controller/songController";
import {isLogged, loggingRedirect} from "./authentication";

const songRouter = Router();
songRouter.get('/', songController.findAll);
songRouter.get('/create', songController.showCreateForm);
// songRouter.get('/create',loggingRedirect, songController.showCreateForm);
// songRouter.post('/create', songController.addSong);
songRouter.get("/your-songs", songController.findAllYours)
// songRouter.get("/your-songs",loggingRedirect, songController.findAllYours)
export default songRouter;