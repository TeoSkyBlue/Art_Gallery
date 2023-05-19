import express from 'express';


const upload_artist_router = express.Router();

upload_artist_router.get("/upload_artist", (req, res) => {
    res.render('upload_artist');
});

export default upload_artist_router;