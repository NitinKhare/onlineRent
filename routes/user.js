let express = require('express');
let router = express.Router();
let validator = require('validator')
let User = require('../models/users');


async function checkUserExists(email){
    if(!validator.isEmail(email)) throw new Error('Invalid Email')
    let user = await User.find({email})
    if(!user) return false;
    return user
}

router.post('/login',async (req, res)=>{
    try{
        if(!req.body.email || !req.body.password) throw new Error("Invalid Details")
        let user = await checkUserExists(email)
        if(!user) throw new Error("The user does not exist")
        if(user.password != req.body.password) throw new Error("invalid credentials");
        let token = await require("../utilities/jwt").generateAuthToken(user)
        res.status(200).json({error:false, token:token})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.post('/',async (req, res)=>{
    try{
    let {name, email,password} = req.body
    if(!validator.isEmail(email)) throw new Error('Invalid Email')
    let checkUser =await checkUserExists(email)
    if(user) throw new Error("The email is already in use");
    var newUser = new User({
        name: name,
        email: email,
        password: password,
    });
    let createUser = await newUser.save();
    res.status(200).json({error:false, message:'created', data:createUser})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})


router.put('/:id',async (req, res)=>{
    try{
        // let checkUser =await checkUserExists(email)
        let getUser = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({error:false, message:'edited successfully'})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.delete('/:id',async (req, res)=>{
    try{
        let checkUser =await checkUserExists(email)
        let getUser = await User.findByIdAndRemove(req.params.id)
        res.status(200).json({error:false, message:'deleted successfully'})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.get('/:id',async (req, res)=>{
    try{
        let getUser = await User.findById(req.params.id)
        res.status(200).json({error:false, message:'ok', data:getUser})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})


module.exports = router;
