import express from 'express';
import { fillArtFields, updateArtwork } from '../controller/uploadArtworkController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';


const edit_artwork_router = express.Router();


edit_artwork_router.get("/edit_artwork", checkAuthenticatedStrict, fillArtFields);

edit_artwork_router.post("/edit_artwork", checkAuthenticatedStrict, updateArtwork);


export default edit_artwork_router;