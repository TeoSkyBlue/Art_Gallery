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
                if (req.file){
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
                newImg.save();
                artistInstance.save();
            }
            else{
                const artistInstance = new galleryModel.artist({
                    info: req.body['summary'],
                    // profile_pic: Default pic(?),
                    born: req.body['birthyear'],
                    died: req.body['deathyear'],
                    // nationality: req.body['nationality'],
                    first_name: req.body['artist-fname'],
                    last_name: req.body['artist-lname'],
                });
                artistInstance.save();
            }
                
                res.redirect('..');
            }
        });
    } catch(err){
        console.log(err);
        res.send(err);
    }
}


export async function showcaseArtist(req, res){
    try{
        const artist_docs = await galleryModel.artist.find({
            _id: req.query['creatorid']
        });
        res.render('artist', {artist: artist_docs});

    }catch(err){
        console.log(err);
        res.send(err);
    }
};

