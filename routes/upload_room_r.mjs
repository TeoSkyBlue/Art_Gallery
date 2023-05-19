import express from 'express';

const upload_room_router = express.Router();

upload_room_router.get('/add_room', (req, res) =>{
    res.render('upload_room');
});


export default upload_room_router;