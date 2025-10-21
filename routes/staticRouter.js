import express from 'express';
import URL from '../models/url.js';

const staticRouter = express.Router()

staticRouter.get('/', (req, res)=>{
    return res.render('home');
})

staticRouter.get('/getallurls', async (req, res)=>{
    let results = await URL.find({});
    return res.render('allurllist', {urls: results})

})


export default staticRouter;