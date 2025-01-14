const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const ConnectionRequest = require('../models/ConnectionRequest');
const userRouter =  express.Router();
const User = require('../models/user');



const User_SAFE_DATA = ['firstName', 'lastName', 'age',"gender","skills","bio"];

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

userRouter.get('/user/connections',userAutho,async(req,res)=>{
    try {
        const logIndUser = req.user;
        const connections =  await ConnectionRequest.find({
            $or:[
                {fromuserId:logIndUser._id, status:"accepted"},
                {touserId:logIndUser._id, status:"accepted"} 
            ]

        }).populate("fromuserId touserId",User_SAFE_DATA);
        
        const data =  Array.from(
            new Set(connections.map((e)=>{
            if(e.fromuserId._id.toString()=== logIndUser._id.toString()){
                return e.touserId;
            }
            return e.fromuserId;
        })))
        

        res.status(200).json({data});// removing duplicate user id from the array
    } catch (error) {
        res.status(404).send(error.message);
        
    }

})

userRouter.get('/feed',userAutho,async(req,res)=>{
    try {
        const logInUser = req.user;
        //for feedApi condition
        //1.usercan not see his profile on feeed
        //2.user can not see his connection profile on the feed
        //3. user can not see profile whom he ignored 
        
        const connections = await ConnectionRequest.find({ // finding all the coonection which either send or recive by the user we should not give the connection on feed
            $or:[
                {fromuserId:logInUser._id},{touserId:logInUser._id}
            ]
    
        }).select("fromuserId touserId firstName")

const hiddenUserfromFeed = new Set();// creating a set for storing a unique userid
connections.forEach((connection)=>{
    hiddenUserfromFeed.add(connection.fromuserId.toString());
    hiddenUserfromFeed.add(connection.touserId.toString());

})
const userfeed = await User.find({//finding user which is not from the hiddenUserfromFeed using $nin(notin) and the login user

    $and:[
      {_id:{$nin:Array.from(hiddenUserfromFeed)}},
      {_id:{$ne:logInUser._id}}
    ]
}).select(User_SAFE_DATA);


        res.status(200).send(userfeed);
    }

     catch (error) {
        res.send(error.message);
    }
})
   

module.exports = userRouter;