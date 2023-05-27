
import db from '../models/mongo_conn.mjs';
import galleryModel from '../models/art_gallery_schema.mjs';
import fs from 'fs';
import sharp from 'sharp';
import { upload } from '../app.mjs';
import { displayArtworks } from './collectionController.mjs';






export async function saveArtwork(req, res){
    try{
        
        upload.single('imageName')(req, res, (err,)=>{
            if (err){
                console.log(err);
            }
            else{
                // sharp(req.file.path)
                // .metadata()
                // .then((metadata) => {
                //     const { width, height } = metadata;
                //     const aspectRatio = width / height;
                //     console.log(`Aspect ratio: ${aspectRatio}`);
                //     })
                //     .catch((err) => {
                //         console.error(err);
                //         });
                //We handle aspect ratios on frontend for now.
                
                let img = fs.readFileSync(req.file.path);
                let encoded_img = img.toString('base64');
                const newImg = new galleryModel.image({name: req.file.originalname,
            image: {
           data: Buffer(encoded_img, 'base64'), contentType: req.file.mimetype
           }
            });
        
        
        console.log(req.body['artist']);
        const artist_doc = galleryModel.artist
        .findById(req.body['artist'])
        .then(function(artist_doc) {
                let artist_name = artist_doc.first_name +' '+artist_doc.last_name;
                const artPiece =  new galleryModel.art({
                name: req.body['artwork-name'],
                genre: req.body['genre'],
                creation_date: req.body['year'],
                summary: req.body['summary'],
                image: newImg._id,
                creator: req.body['artist'],
                creator_name: artist_name
            });
            console.log(artist_name);
            artPiece.save();
            newImg.save();
            res.redirect('..');
            });
        
        

        //THis is unfortunate but seems necessary for the search functionality to work proper
        
    
        
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
            {first_name: doc.first_name, last_name:doc.last_name, id: doc._id, selected: false}));
        const piece = await galleryModel.art
        .findById(req.query['artwork_id'])
        .populate('image');//(req.body['id']);
        
        let date;
        if(piece.creation_date){
            date = new Date(piece.creation_date).toISOString().slice(0, 10);
        }
        for (let artist of artists){
            // JS SUCKS.
            if (artist.id.toString() === piece.creator.toString()){
                artist.selected = true;
                break;
            }
        }
        req.artwork_id = req.query['artwork_id'];
        //get artwork id from query of collection
        //hold the id for the form-post submition
        //image id can be had through here.
        res.render('edit_artwork', {artists,
            creator: piece.creator,
            name: piece.name,
            date: date,
            genre: piece.genre,
            summary: piece.summary,
            img_data: piece.image.image.data.toString('base64'),
            img_type: piece.image.image.contentType,
            // creator_id: creator_id,
            artwork_id: piece._id,
            image_id: piece.image._id,
            

        });
       
    }catch(err){
        console.log(err);
        res.send(err);
    }
}



export async function updateArtwork(req, res){
    
    try{
        upload.single('imageName')(req, res, (err)=>{
            if (err){
                console.log(err);
            }
            else{
                if (req.file){
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
            
            
            
            
            deleteImgAndUpdate(req, res, newImg);
        }
        else{
            const artPiece = galleryModel.art.findOneAndUpdate(
                { _id: req.query['artwork_id'] },
                {
                    name: req.body['artwork_name'],
                    genre: req.body['genre'],
                    creation_date: req.body['year'],
                    summary: req.body['summary'],
                    creator: req.body['artist']
            },
            {new: true})
            .then(res.redirect('..'));
        }
        
    }
});

    }catch(err){
        console.log(err);
        res.send(err);
    }

}



async function deleteImgAndUpdate(req, res, newImg) {
    try {
      const previous_image = await galleryModel.image.deleteOne({
        _id: req.query['image_id']
      });
      const artPiece = await galleryModel.art.findOneAndUpdate(
        { _id: req.query['artwork_id'] },
        {
          name: req.body['artwork-name'],
          genre: req.body['genre'],
          creation_date: req.body['year'],
          summary: req.body['summary'],
          image: newImg._id,
          creator: req.body['artist']
        }
      );
      await newImg.save();
      res.redirect('..');
    } catch (err) {
      console.log(err);
    }
  };
  
  


export async function deleteArtwork(req, res){
    try{
        if(req.query.artid){
            const doc = await galleryModel.art
            .deleteOne({_id: req.query.artid});
            res.redirect('./collection');
        }
        else{
            res.redirect('..');
        }
    }catch(err){
        console.log(err);
    }
}