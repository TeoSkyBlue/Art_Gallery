import express from 'express';
import { engine } from 'express-handlebars';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import home_router from './routes/home_r.mjs';
import collection_router from './routes/collection_r.mjs';
import about_router from './routes/about_r.mjs';
import login_router from './routes/login_r.mjs';

//ES6 Can be annoying at times.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 8080;

app.engine('hbs', engine({extname:'hbs'}));
app.set('view engine', '.hbs');



app.use(express.static(path.join(__dirname, '/public/stylesheets'), { type: 'text/css', }));
app.use(express.static(path.join(__dirname, 'public/scripts'), { type: 'text/javascript', }));

hbs.registerPartials(__dirname + '/views/partials');


app.set('views', path.join(__dirname, 'views'));



app.use(home_router);
app.use(collection_router);
app.use(about_router);
app.use(login_router);





app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}...`);
});


/// DEPRECATED CODE


// app.use('/static', express.static(path.join(__dirname, 'public')));
// From here on below we should add the Routes Folder.
// app.get('/', (req, res)=>{
//     res.render('home');
// });

// app.get('/collection', (req, res) =>{
//     res.render('collection');
// });


// app.get('/about', (req, res) =>{
//     res.render('about');
// });

// app.get('/login', (req, res) =>{
//     res.render('login');
// });