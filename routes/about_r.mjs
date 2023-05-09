import express from 'express'

const about_router = express.Router();

about_router.get('/about', (req, res) => {
    res.render('about');
});

export default about_router;

