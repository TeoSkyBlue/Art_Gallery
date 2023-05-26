import galleryModel from "../models/art_gallery_schema.mjs";
import fs from 'fs';
import { upload } from '../app.mjs';


export async function loadPosts(req, res){
    try{
        const docs = await galleryModel.post
        .find()
        .limit(20)
        .sort('-date')
        .populate('image')
        .populate('authors');//most recent first.

        const posts = docs.map(doc => (
            {
                postid: doc._id,
                image: doc.image.image.data.toString('base64'),
                imagetype: doc.image.image.contentType,
                title: doc.title,
                author: {
                    firstname : doc.authors[0].first_name,
                    lastname: doc.authors[0].last_name,
                },
                content: doc.content,
                edited: doc.edited[0]
            }
        ));
        let username = await req.session.username;
        res.render('announcements', {posts: posts, session_username: username});

    }catch(err){
        console.log(err);
        res.send(err);
    }
}



export async function savePost(req, res){
    try{
        upload.single('postPic')(req, res, (err) => {
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
                    const postInstance = new galleryModel.post({
                        edited: Date.now(), //here is UNIX EPOCH.
                        image: newImg._id,
                        content: req.body['content'],
                        title: req.body['title'],
                        authors: [req.session.userId, ],

                    });
                    newImg.save();
                    postInstance.save();
                    res.redirect('./announcements');

                }
                else{
                    const postInstance = new galleryModel.post({
                        edited: Date.now(), //here is UNIX EPOCH.
                        content: req.body['content'],
                        title: req.body['title'],
                        authors: [req.session.userId, ],

                    });
                    postInstance.save();
                    res.redirect('./announcements');
                }
            }
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
}