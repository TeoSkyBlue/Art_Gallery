import express from 'express';
import { addRoom } from '../controller/roomController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';

const upload_room_router = express.Router();

upload_room_router.get('/add_room', checkAuthenticatedStrict,  (req, res) =>{
    res.render('upload_room');
});

upload_room_router.post('/add_room', checkAuthenticatedStrict, addRoom);


export default upload_room_router;