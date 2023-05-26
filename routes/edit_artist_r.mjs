import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { fillArtistFields } from '../controller/uploadArtistController.mjs';

const edit_artist_router = express.Router();

edit_artist_router.get('/edit_artist', checkAuthenticatedStrict, fillArtistFields);

export default edit_artist_router;