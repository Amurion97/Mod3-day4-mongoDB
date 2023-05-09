"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const songService_1 = __importDefault(require("../service/songService"));
class BrowseController {
    constructor() {
        this.showBrowse = async (req, res) => {
            res.render('index');
        };
        this.songService = songService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new BrowseController();
//# sourceMappingURL=browseController.js.map