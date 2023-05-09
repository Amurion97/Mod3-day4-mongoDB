import express from 'express';
import bodyParser from "body-parser";
import router from "./src/router/router";
import mongoose from "mongoose";
// import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

const app = express();
const hostname = '127.0.0.1';
const port = 1400;
const DB_URL = `mongodb://${hostname}:27017/demo_connect`;
mongoose.connect(DB_URL).then(() => {
    console.log('Connect Database Success');
})
app.set('views', './src/view');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

// app.use(session({
//     secret: 'foo',
//     saveUninitialized: false, // don't create session until something stored
//     resave: false, //don't save session if unmodified
//     store: MongoStore.create({
//         mongoUrl: DB_URL,
//         touchAfter: 24 * 3600 // time period in seconds
//     })
// }));

app.use('', router);
app.use((req, res, next) => {
    res.status(404).render("404")
})
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

