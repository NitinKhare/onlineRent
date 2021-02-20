var User = require('../models/users');
module.exports.isAllowed = async function(req, res, next){
    try{
        if(!req.headers || !req.headers.Authorization) throw new Error("Unauthorized user")
        let decryptJWT = require('../utilities/jwt').verifyAuthToken(req.headers.Authorization)
        req.user = await User.findById(decryptJWT._id)
        return next();
    }catch(e){
        res.status(401).json({error:true, message:e.message})
    }
}