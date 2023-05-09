import {Router} from "express";
import songRouter from "./songRouter";
import artistController from "../controller/artistController";
import userRouter from "./userRouter";
import browseController from "../controller/browseController";
import {isLogged} from "./authentication";
import songController from "../controller/songController";
import chatRouter from "./chatRouter";

const router = Router();
// router.use('/songs', songRouter);
router.use('/songs', function (req, res, next) {
    res.render('index');
});
router.use('/users', userRouter);
router.use('/chat', chatRouter);

// router.get('/', isLogged, browseController.showBrowse);
// router.get('/browse', isLogged, browseController.showBrowse);
router.get('/', browseController.showBrowse);
router.get('/browse', browseController.showBrowse);

router.post('/search-artist-name', artistController.findByName);
router.post('/get-artist-name', artistController.getIDByName);
router.get('/get-artist-avatar/:name', artistController.getAvatar);
// router.post('/get-song-url', songController.getURLByID);


export default router;