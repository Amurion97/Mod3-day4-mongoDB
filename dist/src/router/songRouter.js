"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = __importDefault(require("../controller/songController"));
const authentication_1 = require("./authentication");
const songRouter = (0, express_1.Router)();
songRouter.get('/', songController_1.default.findAll);
songRouter.get('/create', authentication_1.loggingRedirect, songController_1.default.showFormAdd);
songRouter.post('/create', songController_1.default.addSong);
songRouter.get("/your-songs", authentication_1.loggingRedirect, songController_1.default.findAllYours);
exports.default = songRouter;
//# sourceMappingURL=songRouter.js.map