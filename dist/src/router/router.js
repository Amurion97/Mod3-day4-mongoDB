"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songRouter_1 = __importDefault(require("./songRouter"));
const artistController_1 = __importDefault(require("../controller/artistController"));
const userRouter_1 = __importDefault(require("./userRouter"));
const browseController_1 = __importDefault(require("../controller/browseController"));
const authentication_1 = require("./authentication");
const songController_1 = __importDefault(require("../controller/songController"));
const router = (0, express_1.Router)();
router.use('/songs', songRouter_1.default);
router.use('/users', userRouter_1.default);
router.get('/', authentication_1.isLogged, browseController_1.default.showBrowse);
router.get('/browse', authentication_1.isLogged, browseController_1.default.showBrowse);
router.post('/search-artist-name', artistController_1.default.findByName);
router.post('/get-artist-name', artistController_1.default.getIDByName);
router.post('/get-song-url', songController_1.default.getURLByID);
exports.default = router;
//# sourceMappingURL=router.js.map