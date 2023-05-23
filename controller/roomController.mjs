import { multi_upload } from "../app.mjs";
import galleryModel from "../models/art_gallery_schema.mjs";
import multer from 'multer';
import fs from 'fs';



export async function addRoom(req, res){
    try{
        multi_upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
                return;
            } else if (err) {
                // An unknown error occurred when uploading.
                if (err.name == 'ExtensionError') {
                    res.status(413).send({ error: { message: err.message } }).end();
                } else {
                    res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
                }
                return;
            }
    
            // Everything went fine.
            // show file `req.files`
            // show body `req.body`
            const images = req.files;
            const imageIDs = []
            for (let image of images){
                image = fs.readFileSync(image.path);
                let encoded_img = image.toString('base64');
                let newImg = new galleryModel.image({name: image.originalname,
                    image: {
                   data: Buffer(encoded_img, 'base64'), contentType: image.mimetype
                   }
                    });
                imageIDs.push(newImg._id);
                newImg.save();
            }
            const roomInstance = new galleryModel.room({
                number: req.body['roomNum'],
                genre: req.body['genre'],
                description: req.body['roomDescription'],
                images: imageIDs
                
            });
            roomInstance.save();
            
        });
        res.redirect('../exhibition');
    }catch(err){
        console.log(err);
    }
};


export async function displayRooms(req, res){
    try{
        const rooms_doc = await galleryModel.room
        .find()
        .populate('images');

        // console.log(rooms_doc[0]);
        const rooms = rooms_doc.map(doc =>(
            {
                rimg: doc.images[0].image.data.toString('base64'),
                rimg_type: doc.images[0].image.contentType,
                rimg_name: "photo for :" + doc.genre + " room",
                room_genre: doc.genre,
                room_num: doc.number,
                room_sum: doc.description,


        }));
        res.render('exhibition', {rooms: rooms});

    }catch(err){
        console.log(err);
        res.send(err);
    }
};
