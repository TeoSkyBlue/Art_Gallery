import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import home_router from './routes/home_r.mjs';
import collection_router from './routes/collection_r.mjs';
import about_router from './routes/about_r.mjs';
import login_router from './routes/login_r.mjs';
import upload_router from './routes/upload_art_r.mjs';
import exhibition_router from './routes/exhibition_r.mjs';
import edit_artwork_router from './routes/edit_artwork_r.mjs';
import upload_artist_router from './routes/upload_artist.mjs';
import upload_room_router from './routes/upload_room_r.mjs';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';
import galleryModel from "./models/art_gallery_schema.mjs";
import {body, validationResult} from 'express-validator';
// import db from './models/mongo_conn.mjs';


// mongoose.connect('mongodb://127.0.0.1:27017/ArtGallery', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, 'connection error'));
// db.once('open', function() {
//     console.log("Opened succesfully");
// });


//ES6 Can be annoying at times.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const port = process.env.PORT || 8080;

app.engine('hbs', engine({extname:'hbs'}));
app.set('view engine', '.hbs');



app.use(express.static(path.join(__dirname, '/public/stylesheets'), { type: 'text/css', }));
app.use(express.static(path.join(__dirname, 'public/scripts'), { type: 'text/javascript', }));
app.use(express.static(path.join(__dirname, 'public/images'), { type: 'image/png', }));


app.set('views', path.join(__dirname, 'views'));



app.use(home_router);
app.use(collection_router);
app.use(about_router);
app.use(login_router);
app.use(upload_router);
app.use(exhibition_router);
app.use(upload_artist_router);
app.use(upload_room_router);
app.use(edit_artwork_router);

// UPLOAD-DB TESTS /////////


// Needs changing.
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images');
    }, 
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({storage: storage});




app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}...`);
});
