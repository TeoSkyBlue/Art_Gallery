import { multi_upload, upload } from "../app.mjs";
import galleryModel from "../models/art_gallery_schema.mjs";
import multer from 'multer';
import fs from 'fs';



export async function addRoom(req, res){
    try{
        upload.single('roomImage')(req, res, (err)=> {
            if(err){
                console.log(err);
            }
            else{
    
            // Everything went fine.
            // show file `req.files`
            // show body `req.body`
            
                let image = fs.readFileSync(req.file.path);
                let encoded_img = image.toString('base64');
                const newImg = new galleryModel.image({name: image.originalname,
                    image: {
                    data: Buffer(encoded_img, 'base64'), contentType: image.mimetype
                    }
                    });
                newImg.save();
            
                const roomInstance = new galleryModel.room({
                    number: req.body['roomNum'],
                    genre: req.body['genre'],
                    description: req.body['roomDescription'],
                    image: newImg._id,
                    
                });
                roomInstance.save();
            }
            res.redirect('./exhibition');
            });
        
    }catch(err){
        console.log(err);
    }
}


export async function displayRooms(req, res){
    try{
        const rooms_doc = await galleryModel.room
        .find()
        .populate('image');

        // console.log(rooms_doc[0]);
        const rooms = rooms_doc.map(doc =>(
            {   
                rid : doc._id,
                rimg: doc.image.image.data.toString('base64'),
                rimg_type: doc.image.image.contentType,
                rimg_name: "photo for :" + doc.genre + " room",
                room_genre: doc.genre,
                room_num: doc.number,
                room_sum: doc.description,
                authenticated: req.session.rights,
                


        }));
        let username = await req.session.username;
        let authenticated = await req.session.authenticated;
        res.render('exhibition', {session_username: username, rooms: rooms, authenticated: authenticated});

    }catch(err){
        console.log(err);
        res.send(err);
    }
};



export async function fillRoom(req, res){
    try{
        const doc = await galleryModel.room
        .findById(req.query['roomid'])
        .populate('image');
        res.render('edit_room', {
            username: req.session.first_name,
            roomName: doc.name,
            roomNum: doc.number,
            genre: doc.genre,
            Description : doc.description,
            roomid : req.query['roomid'],
            rimage: doc.image.image.data.toString('base64'),
            rimageType: doc.image.image.contentType,
            imageid: doc.image._id,

        });

    }catch(err){
        console.log(err);
    }
}


export async function deleteRoom(req, res){
    try{
        if(req.query['roomid']){
            const doc = await galleryModel.room
            .findByIdAndDelete(req.query['roomid']);
            res.redirect('./exhibition');
        }
        else{
            res.redirect('..');
        }
    }catch(err){
        console.log(err);
    }
}


export async function updateRoom(req, res){
    try{
        upload.single('roomImage')(req, res, (err, )=>{
            if(err){
                console.log(err);
            }
            else{
                if (req.file){
                    let img = fs.readFileSync(req.file.path);
                    let encoded_img = img.toString('base64');
                    const newImg = new galleryModel.image({name: req.file.originalname,
                        image: {
                            data: Buffer(encoded_img, 'base64'),
                            contentType: req.file.mimetype
                        }
            
                    });

                    deleteImgAndUpdateRoom(req, res, newImg);
                }
                else {
                    const roomInstance = galleryModel.room
                    .findByIdAndUpdate(req.query['roomid'],
                    {
                        number: req.body['roomNum'],
                        genre: req.body['genre'],
                        description: req.body['roomDescription'],
                        
                    }, {new: true})
                    .then(res.redirect('./exhibition'));
                }
                
            }
        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
}


async function deleteImgAndUpdateRoom(req, res, newImg){
    try{
        const previous_image = await galleryModel.image
        .findByIdAndDelete(req.query['imageid']);

          const roomInstance = await galleryModel.room
          .findByIdAndUpdate(req.query['roomid'], 
            {
                number: req.body['roomNum'],
                genre: req.body['genre'],
                description: req.body['roomDescription'],
                image: newImg._id,

                    }, {new: true}
          );
          await newImg.save();
          res.redirect('./exhibition');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}