const mongoose = require('mongoose');
const user2Schema = new mongoose.Schema({
    firstName: "string",
    lastName: "string",
    gender : "string",
    age: "string",
});

module.exports = mongoose.model("User2",user2Schema);