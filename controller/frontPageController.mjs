import galleryModel from "../models/art_gallery_schema.mjs";



export async function loadFrontPage(req, res){
    try{
        const docs = await galleryModel.post
        .find()
        .limit(2)
        .sort('-edited')
        .populate('image');

        const rooms_doc = await galleryModel.room
        .find()
        .limit(6)
        .populate('image');


        const rooms = rooms_doc.map(doc =>(
            {   
                rimage: doc.image.image.data.toString('base64'),
                rimagetype: doc.image.image.contentType,
                rgenre: doc.genre,
                rnum: doc.number,
                rdesc: doc.description,
                

        }));



        const posts = docs.map(doc => (
            {
                postid: doc._id,
                pimage: doc.image.image.data.toString('base64'),
                pimagetype: doc.image.image.contentType,
                ptitle: doc.title,
                // author: {
                //     firstname : doc.authors[0].first_name,
                //     lastname: doc.authors[0].last_name,
                // },
                pcontent: doc.content,
                // edited: doc.edited[0]
            }
        ));

        

        let username = await req.session.username;

        res.render('home', {posts: posts, rooms: rooms, session_username: username});
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

