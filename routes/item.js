let express = require('express');
let router = express.Router();
let Item = require('../models/item');
const { create } = require('../models/users');
let User = require('../models/users');
let isAllowed = require("../utilities/isAllowed")
//User Specific Item

router.get('/:id',async (req, res, next)=>{
    try{
        let item = await Item.findById(req.params.id)
        res.status(200).json({error:false, message:'ok', data:item})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.put('/:id',isAllowed,async (req, res, next)=>{
    try{
        if(req.user.Items.indexOf(req.params.id) == -1) throw new Error("This item does not belong to the user")
        let getCompleteItem = await Item.findById(req.params.id)
        if(getCompleteItem.status == 'rented') throw new Error("Item Can not be edited while it is rented")
        let item = await Item.findByIdAndUpdate(req.params.id, res.body)
        res.status(200).json({error:false, message:'ok', data:item})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.post('/',isAllowed,async (req, res, next)=>{
    try{
        if(req.user.Items.indexOf(req.params.id) == -1) throw new Error("This item does not belong to the user")
        var newItem = new Item({
            ...req.body
        });
        let createItem = await newItem.save();
        let updateUser = await User.findByIdAndUpdate(req.body._id, { $push: { items:createItem._id  } })        
        res.status(201).json({error:false, message:'ok', data:createItem})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.delete('/:id',isAllowed,async (req, res)=>{
    try{
        if(req.user.Items.indexOf(req.params.id) == -1) throw new Error("This item does not belong to the user")
        let getCompleteItem = await Item.findById(req.params.id)
        if(getCompleteItem.status == 'rented') throw new Error("Item Can not be deleted while it is rented")
        let getUser = await Item.findByIdAndRemove(req.params.id)
        res.status(200).json({error:false, message:'deleted successfully'})
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})

router.get('/',async (req, res, next)=>{
    try{
        let filters = require("../utilities/generateMongoFilters").generateMongoFilters(req.query);
        let entityResult = await Item.aggregate(filters);
        return res.status(200).json({error:false,data:entityResult});
    }catch(e){
        res.status(406).json({error:true, message:e.message})
    }
})






module.exports = router;
