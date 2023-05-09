"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artistController_1 = __importDefault(require("../controller/artistController"));
const userRouter_1 = __importDefault(require("./userRouter"));
const browseController_1 = __importDefault(require("../controller/browseController"));
const chatRouter_1 = __importDefault(require("./chatRouter"));
const router = (0, express_1.Router)();
router.use('/songs', function (req, res, next) {
    res.render('index');
});
router.use('/users', userRouter_1.default);
router.use('/chat', chatRouter_1.default);
router.get('/', browseController_1.default.showBrowse);
router.get('/browse', browseController_1.default.showBrowse);
router.post('/search-artist-name', artistController_1.default.findByName);
router.post('/get-artist-name', artistController_1.default.getIDByName);
router.get('/get-artist-avatar/:name', artistController_1.default.getAvatar);
exports.default = router;
//# sourceMappingURL=router.js.map