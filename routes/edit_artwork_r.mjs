import express from 'express';
import { fillArtFields, updateArtwork } from '../controller/uploadArtworkController.mjs';


const edit_artwork_router = express.Router();


edit_artwork_router.get("/edit_artwork", fillArtFields);

edit_artwork_router.post("/edit_artwork", updateArtwork);


export default edit_artwork_router;