import galleryModel from "../models/art_gallery_schema.mjs";
import fs from 'fs';
import { upload } from '../app.mjs';


export async function loadPosts(req, res){
    try{
        const docs = await galleryModel.post
        .find()
        .limit(20)
        .sort('-edited')
        .populate('image')
        .populate('authors');//most recent first.
        const posts = docs.map(doc => (
            {
                postid: doc._id,
                imageid: doc.image ? doc.image_id : Boolean(false),
                image: doc.image? doc.image.image.data.toString('base64'): Boolean(false),
                imagetype: doc.image ? doc.image.image.contentType : Boolean(false),
                title: doc.title,
                author: {
                    firstname : doc.authors[0].first_name,
                    lastname: doc.authors[0].last_name,
                },
                content: doc.content,
                edited: doc.edited[0],
                authenticated: req.session.rights,
            }
        ));
        let username = await req.session.username;
        let authenticated = await req.session.rights;
        res.render('announcements',
            {
                posts: posts,
                session_username: username,
                authenticated: authenticated
            });

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


export async function fillPost(req, res){
    try{
        const doc = await galleryModel.post
        .findById(req.query['postid'])
        .populate('image');
        let username = await req.session_username;

        if (doc.image){
            res.render('edit_post',
            {
                session_username: username,
                title: doc.title,
                postid: doc._id,
                imageid: doc.image._id,
                postpic: doc.image.image.data.toString('base64'),
                postpicType: doc.image.image.contentType,
                content: doc.content,

            });
        }
        else{
            res.render('edit_post',
            {
                session_username: username,
                title: doc.title,
                postid: doc._id,
                // imageid: false,
                content: doc.content,

            });
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}



export async function updatePost(req, res){
    try{
        upload.single('postPic')(req, res, (err)=>{
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
                    deleteImgAndUpdatePost(req, res, newImg);
                }
                else{
                    const post = galleryModel.post
                    .findByIdAndUpdate(req.query['postid'],{
                        title: req.body['title'],
                        content: req.body['content'],
                        edited: new Date(),

                    }, {new: true})
                    .then(res.redirect('./announcements'));
                }
            }
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
}


async function deleteImgAndUpdatePost(req, res, newImg){
    try{
        if(req.query['imageid']){
            const previous_image = await galleryModel.image
            .findByIdAndDelete(req.query['imageid']);
        }
        const post = await galleryModel.post
        .findByIdAndUpdate(req.query['postid'],
        {
            title: req.body['title'],
            content: req.body['content'],
            edited: new Date(),
            image: newImg._id,
            //maybe author should return last author instead? 
        });
        await newImg.save();
        res.redirect('./announcements');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}



export async function deletePost(req, res){
    try{
        if(req.query.postid){
            const doc = await galleryModel.post
            .findByIdAndDelete(req.query.postid);
            res.redirect('./announcements');
        }
        else{
            res.redirect('./announcements');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
}