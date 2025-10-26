import express from "express";
import connectmongodb from "./connection.js";
import URL from "./models/url.js";
import path from "path";
import cookieParser from "cookie-parser";

import router from "./routes/url.js";
import userRouter from "./routes/userRoute.js";
import staticRouter from "./routes/staticRouter.js";
import { allowLoggedUsersOnly , checkAuth} from "./middlewares/auth.js";

const app = express()

connectmongodb('mongodb://127.0.0.1:27017/urlshortner').then(()=>{
    console.log("connected to mongodb successfully");
}).catch((err)=>{
    console.log('some error occured', err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views' , path.resolve('./views'));


//routes
app.use('/url', allowLoggedUsersOnly , router);
app.use('/user' , userRouter);
app.use('/', checkAuth ,staticRouter);

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
