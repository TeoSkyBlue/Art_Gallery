import express from 'express'
import { loadPosts } from '../controller/postsController.mjs';

const announcements_router = express.Router();

// announcements_router.get('/announcements', (req, res) => {
//     res.render('announcements');
// });

announcements_router.get('/announcements', loadPosts);

export default announcements_router;