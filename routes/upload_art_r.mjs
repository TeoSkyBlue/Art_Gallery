import multer from 'multer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { saveArtwork, availableArtists } from '../controller/uploadArtworkController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
//TO BE FILLED, logic needs to be on a controller, here only routing.
const upload_router = express.Router();
// //Needs changing.
// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, './public/images');
//     }, 
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({storage: storage});


upload_router.get("/upload_art", checkAuthenticatedStrict, availableArtists);

upload_router.post("/upload_art",checkAuthenticatedStrict, saveArtwork);

export default upload_router;
