import express from 'express'
import { checkAuthenticatedStrict, confirmLogin, logoutUser } from '../controller/userController.mjs';

const login_router = express.Router();

login_router.get('/login', (req, res) => {
    res.render('login');
});


login_router.post('/login', confirmLogin);

login_router.get('/logout', logoutUser);


export default login_router;

