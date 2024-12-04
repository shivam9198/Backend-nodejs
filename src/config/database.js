const mongoose = require('mongoose');

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://Namstedev:bangtk9198@namstenodejs.xlz00.mongodb.net/Devtinder");//mongoose.connect return a promise
};

module.exports = connectDb;
