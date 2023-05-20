
import db from '../models/mongo_conn.mjs';
import galleryModel from '../models/art_gallery_schema.mjs';
import fs from 'fs';
import sharp from 'sharp';
import { upload } from '../app.mjs';






export function saveArtwork(req, res){
    try{
        upload.single('imageName')(req, res, (err)=>{
            if (err){
                console.log(err);
            }
            else{
                sharp(req.file.path)
                .metadata()
                .then((metadata) => {
                    const { width, height } = metadata;
                    const aspectRatio = width / height;
                    console.log(`Aspect ratio: ${aspectRatio}`);
                    })
                    .catch((err) => {
                        console.error(err);
                        });
                
                let img = fs.readFileSync(req.file.path);
                let encoded_img = img.toString('base64');
                const newImg = new galleryModel.image({name: req.file.originalname,
            image: {
           data: Buffer(encoded_img, 'base64'), contentType: req.file.mimetype
           }
            });
        
    

        const artPiece =  new galleryModel.art({
            name: req.body['artwork-name'],
            genre: req.body['genre'],
            creation_date: req.body['year'],
            summary: req.body['summary'],
            image: newImg._id,
            creator: req.body['artist']
        });
    
        artPiece.save();
        newImg.save();
        res.redirect('..');
    }
});

    }catch(err){
        console.log(err);
        res.send(err);
    }

}

export async function availableArtists(req, res){
    try{
        const docs = await db.collection('artists')
        .find()
        .toArray();
        // console.log(docs[0].first_name + ' ' + docs[0].last_name);
        const artists = docs.map(doc => (
            {first_name: doc.first_name, last_name:doc.last_name, id: doc._id}));
        res.render('upload_artwork', {artists});
    }catch(err){
        console.log(err);
        res.send(err);
    }
};

export async function fillArtFields(req, res){
    try{
        const docs = await db.collection('artists')
        .find()
        .toArray();
        // console.log(docs[0].first_name + ' ' + docs[0].last_name);
        const artists = docs.map(doc => (
            {first_name: doc.first_name, last_name:doc.last_name, id: doc._id}));
        const piece = await galleryModel.art
        .findById('64689181d074ef752136a6d6')
        .populate('image');//(req.body['id']);
        

        res.render('edit_artwork', {artists,
            creator: piece.creator,
            name: piece.name,
            date: piece.creation_date,
            genre: piece.genre,
            summary: piece.summary,
            img_data: piece.image.image.data.toString('base64'),
            img_type: piece.image.image.contentType,

        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
}



//sharp usage example

// const sharp = require('sharp');

// app.post('/upload', upload.single('image'), (req, res) => {
//   const { path } = req.file;

//   sharp(path)
//     .metadata()
//     .then((metadata) => {
//       const { width, height } = metadata;
//       const aspectRatio = width / height;
//       console.log(`Aspect ratio: ${aspectRatio}`);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });


//Backend side pagination example.


// const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');

// const schema = new mongoose.Schema({
//   // Your schema definition here
// });

// schema.plugin(mongoosePaginate);

// const Model = mongoose.model('Model', schema);

// // Example usage
// Model.paginate({}, { page: 1, limit: 10 }, function(err, result) {
//   // Your code here
// });