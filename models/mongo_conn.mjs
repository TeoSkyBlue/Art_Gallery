import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';


 mongoose.connect('mongodb://127.0.0.1:27017/ArtGallery', {useNewUrlParser: true});
const db = await mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Opened succesfully");
});


export const my_session = session({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongoUrl: 'mongodb://127.0.0.1:27017/ArtGallery',
        ttl: 60 * 26, //26 mins cookie within db
        
    }), 
});



export default db;