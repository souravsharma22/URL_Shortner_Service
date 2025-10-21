import express from "express";
import router from "./routes/url.js";
import connectmongodb from "./connection.js";
import URL from "./models/url.js";
import path from "path";
import staticRouter from "./routes/staticRouter.js";

const app = express()

connectmongodb('mongodb://127.0.0.1:27017/urlshortner').then(()=>{
    console.log("connected to mongodb successfully");
}).catch((err)=>{
    console.log('some error occured', err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views' , path.resolve('./views'));

app.use('/url', router)
app.use('/', staticRouter);

app.get('/api/:shortId', async (req, res)=>{
    const shortId  = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId: shortId} ,
        {
            $push: {
                    visitHistory:{
                        timestamp : Date.now()
                    }
            }
        }
    )
    res.redirect(entry.redirectURL);
})



app.listen(3000, ()=>{
    console.log("The server is running on the port 3000")
})
