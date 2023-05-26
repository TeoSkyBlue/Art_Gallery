import express from 'express';
import { displayRooms } from '../controller/roomController.mjs';


const exhibition_router = express.Router();
exhibition_router.get('/exhibition', displayRooms);


export default exhibition_router;