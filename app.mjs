import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
const config =  dotenv.config();
import { fileURLToPath } from 'url';
import home_router from './routes/home_r.mjs';
import collection_router from './routes/collection_r.mjs';
import about_router from './routes/about_r.mjs';
import login_router from './routes/login_r.mjs';
import register_router from './routes/register_r.mjs';
import upload_router from './routes/upload_art_r.mjs';
import exhibition_router from './routes/exhibition_r.mjs';
import edit_artwork_router from './routes/edit_artwork_r.mjs';
import delete_artwork_router from './routes/delete_artwork_r.mjs';
import edit_room_router from './routes/edit_room_r.mjs';
import upload_artist_router from './routes/upload_artist.mjs';
import upload_room_router from './routes/upload_room_r.mjs';
import artist_router from './routes/artist_r.mjs';
import announcements_router from './routes/announcements_r.mjs';
import multer from 'multer';
import { my_session } from './models/mongo_conn.mjs';
import edit_artist_router from './routes/edit_artist_r.mjs';
import upload_post_router from './routes/upload_post.mjs';
import edit_post_router from './routes/edit_post_r.mjs';
import delete_post_router from './routes/delete_post_r.mjs';

// import db from './models/mongo_conn.mjs';
// import galleryModel from "./models/art_gallery_schema.mjs";
// import {body, validationResult} from 'express-validator';






// import db from './models/mongo_conn.mjs';



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




app.use(express.urlencoded({extended: true}));

app.use(my_session);
app.use(home_router);
app.use(collection_router);
app.use(about_router);
app.use(login_router);
app.use(register_router);
app.use(upload_router);
app.use(upload_post_router);
app.use(edit_post_router);
app.use(exhibition_router);
app.use(upload_artist_router);
app.use(edit_artist_router);
app.use(upload_room_router);
app.use(edit_artwork_router);
app.use(delete_artwork_router);
app.use(delete_post_router);
app.use(edit_room_router);
app.use(artist_router);
app.use(announcements_router);



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

export const multi_upload = multer({
    storage,
    limits: { fileSize: 2.6 * 1024 * 1024 }, // 2.6MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('uploadedImages', 3);








app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}...`);
});




export default app;