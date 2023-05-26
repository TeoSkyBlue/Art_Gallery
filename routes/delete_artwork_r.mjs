import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { deleteArtwork } from '../controller/uploadArtworkController.mjs';


const delete_artwork_router = express.Router();

delete_artwork_router.get("/delete_artwork",checkAuthenticatedStrict, deleteArtwork);

export default delete_artwork_router;