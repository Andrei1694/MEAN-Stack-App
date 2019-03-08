const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const config = require("../model/") //?


// ==============| User Schema |=================
const UserSchema = mongoose.Schema({
    
    name: {
        type: String
    },
    
    email: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username, callback){
    const querry = { username: username }
    User.findOne(querry, callback);
}

module.exports.addUser = function(newUser, callback){
    // Encrypt password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    });
}

module.exports.comparePassword = function(candidatePasword, hash, callback) {
    bcrypt.compare(candidatePasword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}