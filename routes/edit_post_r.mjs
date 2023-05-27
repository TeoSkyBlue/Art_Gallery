import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { fillPost, updatePost } from '../controller/postsController.mjs';

const edit_post_router = express.Router();

edit_post_router.get('/edit_post', checkAuthenticatedStrict, fillPost);

edit_post_router.post('/edit_post', updatePost);

export default edit_post_router;