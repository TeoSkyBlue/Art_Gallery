import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import dotenv from 'dotenv';
const config =  dotenv.config();


 mongoose.connect(process.env.MONGO_URL_PROD, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Opened succesfully");
});


export const my_session = session({
    secret: process.env.SESSION_SECRET, //process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongoUrl: process.env.MONGO_URL_PROD,
        ttl: 60 * 26, //26 mins cookie within db
        
    }), 
});



export default db;