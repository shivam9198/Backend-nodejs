const mongoose = require('mongoose');
const User = require('../models/user');


const connectionSchema = new mongoose.Schema({
    fromuserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    status:{
        type:String,
        enum:['ignored','interested','rejected', 'accepted'],
        required:true,
    }

 

},{timestamps:true});

//mongoose middle ware this runs when we hit save then this middleware runs 
connectionSchema.pre("save",function(next){
    const connectionRequests = this;
    if(connectionRequests.fromuserId.equals(connectionRequests.touserId)){
        throw new Error("You can't send connection request to yourself");
    }
    next();
})


const ConnectionRequest= mongoose.model("ConnectionRequest",connectionSchema ) ;//model ka nam h connectionRequest and model bna h connectioSchema k schema se 

module.exports =  ConnectionRequest;
