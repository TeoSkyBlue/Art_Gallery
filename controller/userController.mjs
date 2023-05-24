import session from 'express-session';
import galleryModel from '../models/art_gallery_schema.mjs';
import bcrypt from 'bcrypt';


const saltRounds = 12; //always ahead of the curve.


export async function confirmLogin(req, res){
    try{
        if(req.session.authenticated){
            console.log(req.session);
            res.redirect('..');
        }
        else{
            const user =  await galleryModel.admin.findOne({
                email: req.body['email'],
            });
            if(user){
                    let validation = await bcrypt.compare(req.body['user_password'], user.password);
                    if (validation){
                        req.session.authenticated = true;
                        const salt = await bcrypt.genSalt(4);
                        const session_hash = await bcrypt.hash(req.body.user_password, salt);
                        req.session.user = session_hash;
                            console.log(req.session);
                            console.log(bcrypt.compare(toString(user._id), session_hash));
                            res.redirect('..');
                    }    
                    
                    else{
                        res.redirect('./login');
                    }
                }
        }
    }catch(err){
        console.log(err);
        res.redirect('./login');
    }
    
};



export function checkAuthenticated(req, res, next){
    if(authenticated){ next();}
    else{
        res.redirect('/login');
    }
};


export async function registerUser(req, res){
    
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const ps_hash = await bcrypt.hash(req.body.user_password, salt);
        const user = new galleryModel.admin({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: ps_hash,
            adminStatus: false
        });
        user.save();
        res.redirect('..');
    }catch(err){
        console.log(err);
    }
};