import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function generateNewURL(req, res){
    const shortId = nanoid(8);
    const body  = req.body;

    if(!body.url) return res.status(400).json({msg: "Url is required enter url in body"})
    await URL.create({
        shortId: shortId,
        redirectURL : body.url,
        visitHistory : [],
        createdBy: req.user._id
    })

    return res.render('home', {id : shortId})
    // return res.json({id: shortId})
}

async function getAnalytics(req , res){
    let shortId = req.params.id;
    let response = await URL.findOne({shortId : shortId})
    return res.json({totalclicks : response.visitHistory.length})

}


export { generateNewURL , getAnalytics}