import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

//ES6 Can be annoying at times.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT || 8080;

app.engine('hbs', engine({extname:'hbs'}));
app.set('view engine', '.hbs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));


// From here on below we should add the Routes Folder.
app.get('/home', (req, res)=>{
    res.render('home');
})

app.get('/collection', (req, res) =>{
    res.render('collection');
})


app.get('/about', (req, res) =>{
    res.render('about');
})

app.get('/login', (req, res) =>{
    res.render('login');
})


app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}...`);

})