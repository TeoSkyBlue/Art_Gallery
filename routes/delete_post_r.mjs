import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { deletePost } from '../controller/postsController.mjs';


const delete_post_router = express.Router();

delete_post_router.get("/delete_post",checkAuthenticatedStrict, deletePost);

export default delete_post_router;