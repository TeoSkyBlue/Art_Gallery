import express from 'express'

const home_router = express.Router();

home_router.get('/', (req, res) => {
    res.render('home');
});

export default home_router;

