import express from 'express';

const exhibition_router = express.Router();

exhibition_router.get('/exhibition', (req, res) => {
    res.render('exhibition');
})


export default exhibition_router;