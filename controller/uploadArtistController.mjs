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
                if(req.file){
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
                else{
                    const artistInstance = new galleryModel.artist({
                        info: req.body['summary'],
                        born: req.body['birthyear'],
                        died: req.body['deathyear'],
                        first_name: req.body['artist-fname'],
                        last_name: req.body['artist-lname'],
                    });
                    artistInstance.save();
                    res.redirect('..');
                }
            } 
        });
        
    } catch(err){
        console.log(err);
        res.send(err);
    }
}


export async function showcaseArtist(req, res){
    try{
        const artist_docs = await galleryModel.artist
        .findById(req.query['creatorid'])
        .populate('profile_pic');

        const artworks = await galleryModel.art
        .find({creator: req.query['creatorid']})
        .populate('image')
        .limit(4);

        const artdocs = artworks.map(doc =>({
            artpic: doc.image.image.data.toString('base64'),
            artpictype: doc.image.image.contentType,

        }));

        if(artist_docs.profile_pic){
            res.render('artist', {artist: artist_docs,
                profile_pic: artist_docs.profile_pic.image.data.toString('base64'),
                profile_pic_type: artist_docs.profile_pic.image.contentType,
                first_name: artist_docs.first_name,
                last_name:artist_docs.last_name,
                nationality: artist_docs.nationality,
                born: artist_docs.born,
                died: artist_docs.died,
                info: artist_docs.info,
                artworks: artdocs,
                creatorid: req.query['creatorid'],
                });
            }
        //DB should be made such that code NEVER reaches the else
        //That means, default profile pic for artists

        else{
            res.render('artist', {artist: artist_docs,
                // profile_pic: artist_docs.profile_pic.image.data.toString('base64'),
                // profile_pic_type: artist_docs.profile_pic.image.contentType,
                first_name: artist_docs.first_name,
                last_name:artist_docs.last_name,
                nationality: artist_docs.nationality,
                born: artist_docs.born,
                died: artist_docs.died,
                info: artist_docs.info,
                artworks: artdocs,
                creatorid: req.query['creatorid'],

                });
        }

    }catch(err){
        console.log(err);
        res.send(err);
    }
};



