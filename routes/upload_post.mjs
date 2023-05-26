import express from 'express';
import { checkAuthenticatedStrict } from '../controller/userController.mjs';
import { savePost } from '../controller/postsController.mjs';
//savePost/

const upload_post_router = express.Router();

upload_post_router.get('/upload_post', checkAuthenticatedStrict, async function (req, res) {
    let username = await req.session.first_name;
    res.render('upload_post', {session_username : username});
});

upload_post_router.post('/upload_post', checkAuthenticatedStrict, savePost);

export default upload_post_router;
