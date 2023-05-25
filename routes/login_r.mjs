import express from 'express'
import { checkAuthenticatedStrict, confirmLogin } from '../controller/userController.mjs';

const login_router = express.Router();

login_router.get('/login', (req, res) => {
    res.render('login');
});


login_router.post('/login', confirmLogin);



export default login_router;

