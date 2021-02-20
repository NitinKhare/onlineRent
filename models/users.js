var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    items:[{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
});

module.exports = mongoose.model('User', UserSchema);