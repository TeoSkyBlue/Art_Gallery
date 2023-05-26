import express from 'express'
import { loadFrontPage } from '../controller/frontPageController.mjs';

const home_router = express.Router();

// home_router.get('/', (req, res) => {
//     res.render('home', {session_username: req.session.username});
// });

home_router.get('/', loadFrontPage);

export default home_router;

