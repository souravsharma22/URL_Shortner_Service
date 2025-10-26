import user from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../services/auth.js";


async function handleSignUp(req , res){
    const {name , email  , password} = req.body;

    await user.create({
        name: name, 
        email: email,
        password: password
    })

    return res.render('home')
}

async function handleLogIn(req , res){
    const {email , password} = req.body;

    const currentUser  = await user.findOne({email , password})
    if(!currentUser)
        return res.render('login' , {error: "Invalid Username or passwors"});

    // const sessionId = uuidv4()

    const token = setUser(currentUser);

    res.cookie('uid' , token );
    return res.redirect('/')
}

export  {handleSignUp , handleLogIn}