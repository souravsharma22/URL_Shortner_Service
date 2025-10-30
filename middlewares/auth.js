import { getUser } from "../services/auth.js";

// function checkForAuthentication(req , res , next){
//     req.user = null;
//     const authorizationHeaderValue  = req.header['authorization'];
//     if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
//         return next();
//     const token = authorizationHeaderValue.split('Bearer ')[1];
//     const user = getUser(token);
//     req.user = user;
//     next();
// }

function restrictTo(roles = []){
    return function(req , res ,next){
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.end('UnAuthorized')
        return next();
    }
}
async function allowLoggedUsersOnly (req , res , next) {
    const userId = req.cookies.uid;

    //using headers , authorization
    // const userId = req.headers['authorization'].split("Bearer ")[1];

    // console.log(userId);

    if(!userId) return res.redirect('/login' )
    // console.log(userId);
    const user = getUser(userId)  
    // console.log(user)  
    if(!user) return res.redirect('/login')
    req.user = user;
    return next();
}

export {allowLoggedUsersOnly , restrictTo}


// async function checkAuth (req , res , next) {

//     // const userId = req.cookies.uid;
//     // const user = getUser(userId)    

//     //verigying with headers authorization
//     const header = req.headers;
//     // console.log(header);
//     const token = header['authorization'].split("Bearer ")[1];
//     const user = getUser(token);
//     req.user = user;
//     next();
// }


// export {allowLoggedUsersOnly , checkAuth}
