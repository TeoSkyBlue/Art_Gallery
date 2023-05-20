
import db from '../models/mongo_conn.mjs';


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
        const docs =  await db.collection('arts')
        .aggregate([
            {$lookup:
                {
                    from: 'images',
                    localField: 'image',
                    foreignField: '_id',
                    as: "art_image"
                }
            },
            {$lookup:
                {
                    from: 'artists',
                    localField:'creator',
                    foreignField: '_id',
                    as: 'artist'
                }
                
            }

        ])
        .limit(9)
        .toArray();
        // console.log(docs[3].artist);
        // const artworks = [];
        // for (let document of docs){
        //     artworks.push(document.art_image[0].map(doc => ({img: doc.art_image.image.data.toString('base64'), type: doc.name})));
        // }
        
        const artworks = docs.map(doc => (
            {
                img: doc.art_image[0].image.data.toString('base64'),
                type: doc.name,
                artist_fname: doc.artist.first_name,
                artist_lname: doc.artist.last_name,
            }));

        res.render('collection', { artworks });
    }catch(err){
        console.log(err);
        res.send(err);
    }
};
