const mongoose = require('mongoose');

const connectDb = async()=>{
    await mongoose.connect(process.env.DB_String);//mongoose.connect return a promise
};

module.exports = connectDb;
