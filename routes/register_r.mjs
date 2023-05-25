import express from 'express'
import { registerUser } from '../controller/userController.mjs';

const register_router = express.Router();

register_router.get('/register', (req, res) => {
    res.render('register');
});


register_router.post('/register', registerUser);



export default register_router;
