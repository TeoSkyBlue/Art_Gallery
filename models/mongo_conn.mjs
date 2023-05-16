import mongoose from 'mongoose';


mongoose.connect('mongodb://127.0.0.1:27017/ArtGallery', {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Opened succesfully");
});

export default db;