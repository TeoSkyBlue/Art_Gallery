
import db from '../models/mongo_conn.mjs';


export async function displayArtworks(req, res){
    try{
        const docs =  await db.collection('images').find().limit(9).toArray();
        const artworks = docs.map(doc => ({img: doc.image.data.toString('base64'), type: doc.name}));
        res.render('collection', { artworks });
    }catch(err){
        console.log(err);
        res.send(err);
    }

}