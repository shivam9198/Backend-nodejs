const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const ConnectionRequest = require('../models/ConnectionRequest');
const userRouter =  express.Router();



const User_SAFE_DATA = ['firstName', 'lastName', 'age'];

userRouter.get('/user/request/recived',userAutho,async(req,res)=>{
    try {
        const loginUser= req.user;
        
        const requestRecived =  await ConnectionRequest.find({
            touserId:loginUser._id,
            status:"interested"
 }).populate("fromuserId" ,User_SAFE_DATA);
      
        if(!requestRecived){
            throw new Error("no request recived");
        }

        res.status(200).send(requestRecived);




        
    } catch (error) {
        res.status(404).send(error.message);
    }

})


module.exports = userRouter;