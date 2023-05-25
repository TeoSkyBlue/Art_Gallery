import express from 'express'

import { SearchAndDisplay, displayArtworks } from '../controller/collectionController.mjs';



const collection_router = express.Router();

// collection_router.get('/collection', (req, res) => {
//     console.log("hi");
//     db.collection('images').findOne({ name: "MoustakasOoof.png" }, (err, result) => {
//         if (err) return console.log(err);
//         console.log(result.image.data.toString('base64'));

//         res.render('collection', { img: result.image.data.toString('base64'),  type: result.image.contentType});

//       });
// });


collection_router.get('/collection', displayArtworks);

collection_router.post('/collection', SearchAndDisplay);

export default collection_router;

