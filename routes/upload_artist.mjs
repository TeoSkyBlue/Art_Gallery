import express from 'express';
import { saveArtist } from '../controller/uploadArtistController.mjs';


const upload_artist_router = express.Router();

upload_artist_router.get("/upload_artist", (req, res) => {
    res.render('upload_artist');
});

upload_artist_router.post("/upload_artist", saveArtist);


export default upload_artist_router;