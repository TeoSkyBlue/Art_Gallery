
import db from '../models/mongo_conn.mjs';
import galleryModel from '../models/art_gallery_schema.mjs';
import fs from 'fs';
import { upload } from '../app.mjs';






export function saveArtwork(req, res){
    try{
        upload.single('imageName')(req, res, (err)=>{
            if (err){
                console.log(err);
            }
            else{
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
            image: newImg._id
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