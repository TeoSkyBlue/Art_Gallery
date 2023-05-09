import express from 'express'

const collection_router = express.Router();

collection_router.get('/collection', (req, res) => {
    res.render('collection');
});

export default collection_router;

