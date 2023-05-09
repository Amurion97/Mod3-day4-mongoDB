"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = __importDefault(require("../controller/songController"));
const songRouter = (0, express_1.Router)();
songRouter.get('/', songController_1.default.findAll);
songRouter.get('/create', songController_1.default.showCreateForm);
songRouter.get("/your-songs", songController_1.default.findAllYours);
exports.default = songRouter;
//# sourceMappingURL=songRouter.js.map