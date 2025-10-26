let sessionIdToUser = new Map();

function setUser(id, user){
    sessionIdToUser.set(id, user);
}

function getUser(id){
    return sessionIdToUser.get(id);
}

export {setUser , getUser}