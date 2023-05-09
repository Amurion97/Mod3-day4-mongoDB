"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controller/chatController"));
const chatRouter = (0, express_1.Router)();
chatRouter.get('/', chatController_1.default.findAll);
exports.default = chatRouter;
//# sourceMappingURL=chatRouter.js.map