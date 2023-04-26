"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./src/router/router"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const app = (0, express_1.default)();
const hostname = '127.0.0.1';
const port = 1400;
const DB_URL = `mongodb://${hostname}:27017/demo_connect`;
mongoose_1.default.connect(DB_URL).then(() => {
    console.log('Connect Database Success');
});
app.set('views', './src/view');
app.set('view engine', 'ejs');
app.use(express_1.default.static('./public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'foo',
    saveUninitialized: false,
    resave: false,
    store: connect_mongo_1.default.create({
        mongoUrl: DB_URL,
        touchAfter: 24 * 3600
    })
}));
app.use('', router_1.default);
app.use((req, res, next) => {
    res.status(404).render("404", { isLogged: req.session["isLogged"] });
});
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map