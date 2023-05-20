import galleryModel from "../models/art_gallery_schema.mjs";
import fs from 'fs';
import { upload } from '../app.mjs';


export function saveArtist(req, res){
    try{
        upload.single('artistImage')(req, res, (err) =>{
            if(err){
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
                const artistInstance = new galleryModel.artist({
                    info: req.body['summary'],
                    profile_pic: newImg._id,
                    born: req.body['birthyear'],
                    died: req.body['deathyear'],
                    first_name: req.body['artist-fname'],
                    last_name: req.body['artist-lname'],
                });
                artistInstance.save();
                newImg.save();
                res.redirect('..');
            }
        });
    } catch(err){
        console.log(err);
        res.send(err);
    }
}
