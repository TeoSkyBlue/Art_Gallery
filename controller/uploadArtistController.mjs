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
                born: artist_docs.born? (new Date(artist_docs.born).toISOString().slice(0, 10)): Boolean(false),
                died: artist_docs.died? (new Date(artist_docs.died).toISOString().slice(0, 10)): Boolean(false),
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
                born: artist_docs.born? (new Date(artist_docs.born).toISOString().slice(0, 10)): Boolean(false),
                died: artist_docs.died? (new Date(artist_docs.died).toISOString().slice(0, 10)): Boolean(false),
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


export async function fillArtistFields(req, res){
    try{
        const doc = await galleryModel.artist
        .findById(req.query['artistid'])
        .populate('profile_pic');
        let username = await req.session.username;
        let born, died;
        if(doc.born){
            born = new Date(doc.born).toISOString().slice(0, 10);
            //Dates are one more droplet in an already filled-to-the-brim glass
            //of javascript pain, which could very well push me over the 
            //edge. Still here though...Strange.
        }
        if(doc.died){
            died = new Date(doc.died).toISOString().slice(0, 10);
        }
        if(doc.profile_pic){
            res.render('edit_artist', {
                session_username: username,
                info: doc.info,
                born: born,
                died: died,
                first_name: doc.first_name,
                last_name: doc.last_name,
                profile_pic : doc.profile_pic.image.data.toString('base64'),
                profile_pic_type: doc.profile_pic.image.contentType,
                imageid : doc.profile_pic._id,
                artistid: doc._id

            });
        }
        else{
            res.render('edit_artist', {
                session_username: username,
                info: doc.info,
                born: born,
                died: died,
                first_name: doc.first_name,
                last_name: doc.last_name,
                artistid: doc._id,
            });
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
};

export async function updateArtist(req, res){
    try{
        upload.single('artistImage')(req, res, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                if(req.file){
                    let img = fs.readFileSync(req.file.path);
                    let encoded_img = img.toString('base64');
                    const newImg = new galleryModel.image(
                        {
                            name: req.file.originalname,
                            image: {
                                data: Buffer(encoded_img, 'base64'),
                                contentType: req.file.mimetype,
                            }

                        }
                    );
                    deleteImgAndUpdateArtist(req, res, newImg);
                }
                else{ 
                    /*Why does this need to be a callback when the whole website is 
                    async/await? Well, it needs to be because it is part of the 
                    callback-based middleware of multer.So, .then() it is. */
                    
                    const artist = galleryModel.artist.findOneAndUpdate(
                        { _id: req.query['artistid'] },
                        {
                          first_name: req.body['artist-fname'],
                          last_name: req.body['artist-lname'],
                          born: req.body['birthyear'],
                          died: req.body['deathyear'],
                          info: req.body['summary'], 
                        },
                        {new: true}
                      ).then(res.redirect('..'));
                }
            }
        });

    }catch(err){
        console.log(err);
        res.send(err);
    }
}



async function deleteImgAndUpdateArtist(req, res, newImg) {
    try {
      const previous_image = await galleryModel.image.deleteOne({
        _id: req.query['image_id']
      });
      const artist = await galleryModel.artist.findOneAndUpdate(
        { _id: req.query['artistid'] },
        {
          first_name: req.body['artist-fname'],
          last_name: req.body['artist-lname'],
          born: req.body['birthyear'],
          died: req.body['deathyear'],
          info: req.body['summary'],
          profile_pic: newImg._id,

        }
      );
      await newImg.save();
      res.redirect('..');
    } catch (err) {
      console.log(err);
    }
  };