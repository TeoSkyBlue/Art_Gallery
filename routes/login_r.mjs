import express from 'express'

const login_router = express.Router();

login_router.get('/login', (req, res) => {
    res.render('login');
});

export default login_router;

