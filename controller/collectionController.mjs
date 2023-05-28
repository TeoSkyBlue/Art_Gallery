
import db from '../models/mongo_conn.mjs';
import galleryModel from '../models/art_gallery_schema.mjs';

//Deprecated, used only for testing.
export async function displayImages(req, res){
    try{
        const docs =  await db.collection('images').find().toArray();
        // console.log(docs);
        const artworks = docs.map(doc => ({img: doc.image.data.toString('base64'), type: doc.name}));
        res.render('collection', { artworks });
    }catch(err){
        console.log(err);
        res.send(err);
    }

};




export async function displayArtworks(req, res){
    try{
        let docs;
        if(req.query.genre){
             docs =  await galleryModel.art
            .find({genre: req.query.genre})
            .populate('image')
            .populate('creator');
        }else{
            docs =  await galleryModel.art
            .find()
            .populate('image')
            .populate('creator');
        }
        // console.log(docs[0].image._id);
        // let date;
        // if(piece.creation_date){
        //     date = new Date(piece.creation_date).toISOString().slice(0, 10);
        // }
        
        const artworks = docs.map(doc => (
            {
                artpiece: doc.image.image.data.toString('base64'),
                art_type: doc.image.image.contentType,
                image_id: doc.image._id,
                artname: doc.name,
                artgenre: doc.genre,
                artist_fname: doc.creator.first_name,
                artist_lname: doc.creator.last_name,
                creatorid : doc.creator._id,
                artsum: doc.summary,
                artdate: doc.creation_date? (new Date(doc.creation_date).toISOString().slice(0, 4)): Boolean(false),
                //Average sane JS oneliner.
                artid: doc._id,
                authenticated: req.session.rights,
                
            }));
        let username = await req.session.username;
        let authenticated = await req.session.rights;
        res.render('collection',
         { 
            artworks: artworks,
            session_username: username,
            authenticated: authenticated,
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
};



export async function SearchAndDisplay(req, res){
    try{
        // let regex = new RegExp(req.body['userQuery'], 'i');
        // const docs = await galleryModel.art
        
        // .find({ $or :[
        //     {name:{
        //             $regex: regex
        //         }
        //     },
        //     {genre:{
        //             $regex: regex
        //         }
        //     },
        //     {summary:{
        //             $regex: regex
        //         }
        //     },
        // ]})
        // .populate('creator')
        // .populate('image')
        // .explain("executionStats"); //No Indexing used.
        // let regex = req.body['userQuery'];
        const docs = await galleryModel.art
        .find({ $text :
            { $search: req.body['userQuery']}},
            { score: {$meta: 'textScore'}}    
        )
        .populate('creator')
        .populate('image');
        //.explain("executionStats"); //Uses Indexing!

        const artworks = docs.map(doc => (
            {
                artpiece: doc.image.image.data.toString('base64'),
                art_type: doc.image.image.contentType,
                image_id: doc.image._id,
                artname: doc.name,
                artgenre: doc.genre,
                artist_fname: doc.creator.first_name,
                artist_lname: doc.creator.last_name,
                creatorid : doc.creator._id,
                artsum: doc.summary,
                artdate: doc.creation_date? (new Date(doc.creation_date).toISOString().slice(0, 4)): Boolean(false),
                artid: doc._id,
                authenticated: req.session.rights,
                username: req.session.first_name
            }));
            let username = await req.session.username;
            let authenticated = await req.session.rights;

        res.render('collection',
         { 
            artworks: artworks,
            authenticated: authenticated,
            session_username: username,
         });
    }catch(err){
        console.log(err);
    }
}