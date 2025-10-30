import express from 'express';
import URL from '../models/url.js';
import { generateNewURL , getAnalytics } from "../controllers/url.js";
import { restrictTo } from '../middlewares/auth.js';

const router = express.Router()

router.post('/', restrictTo(["NORMAL",'ADMIN']), generateNewURL);

router.get('/analytics/:id', restrictTo(["NORMAL",'ADMIN']),getAnalytics );

router.get('/getallurls', restrictTo(["NORMAL",'ADMIN']), async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    let results = await URL.find({ createdBy : req.user._id});
    return res.render('allurllist', {urls: results})

})

router.get('/admin/getallurls', restrictTo(['ADMIN']), async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    let results = await URL.find({});
    return res.render('allurllist', {urls: results})

})
export default router;