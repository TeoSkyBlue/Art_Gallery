import express from 'express';
import { saveArtist } from '../controller/uploadArtistController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';


const upload_artist_router = express.Router();

upload_artist_router.get("/upload_artist", checkAuthenticatedStrict, (req, res) => {
    res.render('upload_artist', {session_username: req.session.first_name});
});

upload_artist_router.post("/upload_artist", checkAuthenticatedStrict, saveArtist);


export default upload_artist_router;