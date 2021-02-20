const jwt = require('jsonwebtoken');

module.exports.generateAuthToken = function (user) {
    let toCreate ={email: user.email, _id:user._id}
    const token = jwt.sign(toCreate, process.env.SECRET, { expiresIn:  '30m' });
    return token;
}

module.exports.verifyAuthToken = (token)=>{
    try{
        if(!token) throw new Error("No Token Found");
        let user = jwt.verify(token.split('Bearer').pop(), process.env.SECRET);
        return user
    }catch(e){
        return false
    }
}