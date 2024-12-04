const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName:"string",
    lastName:"string",
    age:"string",
    email:"string",
    password:"string",
    hobbies:["string"],
    profilePic:"string",
    dateOfBirth:"date",
    gender:"string",
    bio:"string",
    location:"string"


} );

module.exports  = mongoose.model("User", userSchema);