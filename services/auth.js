// let sessionIdToUser = new Map();
import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken'
const secretkey = process.env.SECERET_KEY

function setUser(user){
    // sessionIdToUser.set(id, user);
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role
    } , secretkey)
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token ,secretkey)
    }catch(err){
        return null;
    }
}

export {setUser , getUser}