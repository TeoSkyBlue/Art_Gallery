import express from 'express'

import { SearchAndDisplay, displayArtworks } from '../controller/collectionController.mjs';



const collection_router = express.Router();




collection_router.get('/collection', displayArtworks);

collection_router.post('/collection', SearchAndDisplay);

export default collection_router;

