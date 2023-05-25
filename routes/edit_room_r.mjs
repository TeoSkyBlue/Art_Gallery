import express from 'express';
import { fillRoom } from '../controller/roomController.mjs';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
// import { fillRoom, updateRoom } from '../controller/roomController.mjs';


const edit_room_router = express.Router();


edit_room_router.get("/edit_room", checkAuthenticatedStrict, fillRoom);

// edit_room_router.post("/edit_room", checkAuthenticatedStrict, updateRoom);


export default edit_room_router;