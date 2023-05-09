import {Router} from "express";
import chatController from "../controller/chatController";

const chatRouter = Router();
chatRouter.get('/', chatController.findAll);
// chatRouter.get('/create',loggingRedirect, songController.showFormAdd);
// chatRouter.post('/create', songController.addSong);
// chatRouter.get("/your-songs",loggingRedirect, songController.findAllYours)
export default chatRouter;