import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { fillArtistFields, updateArtist } from '../controller/uploadArtistController.mjs';


const edit_artist_router = express.Router();

edit_artist_router.get('/edit_artist', checkAuthenticatedStrict, fillArtistFields);
edit_artist_router.post('/edit_artist', checkAuthenticatedStrict, updateArtist);

export default edit_artist_router;