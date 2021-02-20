  
var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    alias: { type: String },
    description: { type: String },
    rent_price: { type: Number,required: true },
    compare_price: { type: Number },
    manufacture_date:{ type:String },
    inventory_management: { type: String, enum: ['rented', 'available'], default: 'available', required: true },

},{timestamps:true});

module.exports = mongoose.model('Product', ProductSchema);