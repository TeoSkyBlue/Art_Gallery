import express from 'express';
import { addRoom } from '../controller/roomController.mjs';

const upload_room_router = express.Router();

upload_room_router.get('/add_room', (req, res) =>{
    res.render('upload_room');
});

upload_room_router.post('/add_room', addRoom);


export default upload_room_router;