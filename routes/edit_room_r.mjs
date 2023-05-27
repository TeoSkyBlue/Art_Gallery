import express from 'express';
import { deleteRoom, fillRoom, updateRoom } from '../controller/roomController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';



const edit_room_router = express.Router();


edit_room_router.get("/edit_room", checkAuthenticatedStrict, fillRoom);

edit_room_router.post("/edit_room", checkAuthenticatedStrict, updateRoom);

edit_room_router.get('/delete_room', checkAuthenticatedStrict, deleteRoom);

export default edit_room_router;