var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    items:[{type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
    rent_history:{type:[{
        rented_by:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        rented_on:{ type: Date },
        returned : {type:Date}
    }]}
});

module.exports = mongoose.model('User', UserSchema);