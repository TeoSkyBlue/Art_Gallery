import express from 'express'

const announcements_router = express.Router();

announcements_router.get('/announcements', (req, res) => {
    res.render('announcements');
});

export default announcements_router;