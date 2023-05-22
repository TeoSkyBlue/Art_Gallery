import express from 'express';
import { showcaseArtist } from '../controller/uploadArtistController.mjs';

const artist_router = express.Router();

artist_router.get('/artist', showcaseArtist);


export default artist_router;
