import express from 'express';
import URL from '../models/url.js';

const staticRouter = express.Router()

staticRouter.get('/', (req, res)=>{
    return res.render('home');
})

staticRouter.get('/getallurls', async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    let results = await URL.find({ createdBy : req.user._id});
    return res.render('allurllist', {urls: results})

})

staticRouter.get("/signup" , (req, res)=>{
    return res.render('signup');
})


staticRouter.get("/login" , (req, res)=>{
    return res.render('login');
})

export default staticRouter;