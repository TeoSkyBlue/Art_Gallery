import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import home_router from './routes/home_r.mjs';
import collection_router from './routes/collection_r.mjs';
import about_router from './routes/about_r.mjs';
import login_router from './routes/login_r.mjs';
import mongoose from 'mongoose';
import multer from 'multer';
import galleryModel from "./models/art_gallery_schema.mjs";


mongoose.connect('mongodb://127.0.0.1:27017/ArtGallery', {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Opened succesfully");
});



const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/images');
    }, 
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});




//ES6 Can be annoying at times.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const port = process.env.PORT || 8080;

app.engine('hbs', engine({extname:'hbs'}));
app.set('view engine', '.hbs');



app.use(express.static(path.join(__dirname, '/public/stylesheets'), { type: 'text/css', }));
app.use(express.static(path.join(__dirname, 'public/scripts'), { type: 'text/javascript', }));


app.set('views', path.join(__dirname, 'views'));



app.use(home_router);
app.use(collection_router);
app.use(about_router);
app.use(login_router);

// UPLOAD-DB TESTS /////////

const upload = multer({storage: storage});


app.get("/upload", (req, res) => {
    res.render("upload");
});


app.post("/upload", (req, res) => {
    upload.single('imageName')(req, res, (err) =>{
        if (err){
            console.log(err);
        }
        else{
            const newImage = new galleryModel.image({name: req.file.originalname,
                 image: {
                data:req.file.filename, contentType: 'image/png'
                }
        });
            newImage
            .save()
            .then(() => res.send('successfully uploaded'))
            .catch(err=>console.log(err));
        }
    });
});
    
// END OF TEST CODE ///////





app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}...`);
});

