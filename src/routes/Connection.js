const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const connectionRouter = express.Router();
const ConnectionRequest = require('../models/ConnectionRequest');
const User = require('../models/user');



connectionRouter.post('/request/:status/:userid',userAutho,async(req,res)=>{

    try {
        const fromuserId = req.user.id;
        const touserId = req.params.userid;
        const status = req.params.status;



        const allowedStatus = ["interested","ignored"];
        if (!allowedStatus.includes(status)){
            throw new Error("Invalid status");
        }

        //cheking corner cases
        // case 1 
        const touser =  await User.findById(touserId);
        if(!touser){
            throw new Error("User not found");
        }
        //case 2
    //    if(fromuserId==touserId){
    //           throw new Error("You can't send connection request to yourself");
    //    }
       //case3 is there is any existing request already means that a=>b or b=>a

       const  existingRequest = await ConnectionRequest.findOne({
        $or: [
            { fromuserId: fromuserId, touserId: touserId }, // Corrected key-value pairs
            { fromuserId: touserId, touserId: fromuserId }  // Corrected key-value pairs
        ]
    });
    
       if(existingRequest){
              throw new Error("Connection request already exist");
       }

      const connectionRequests = new ConnectionRequest(
            {
                fromuserId,
                touserId,
                status,
            }
      )
      await connectionRequests.save();
      // Populate `touserId` after saving to include `firstName` and `lastName`
const populatedConnection = await connectionRequests.populate("touserId", "firstName lastName");

// Extract `firstName` and `lastName` from the populated data
const { firstName, lastName } = populatedConnection.touserId;
res.status(200).send(`Connection request marked as '${status}' for user: ${firstName} ${lastName}`);
    } catch (error) {
        res.status(404).send(error.message);
    }

});

connectionRouter.post('/request/review/:status/:requestId',userAutho,async(req,res)=>{
    try {
        const loginuser = req.user;
        const {status,requestId} = req.params;
        const isAllowedStatus = ["accepted","rejected"];
        if(!isAllowedStatus.includes(status)){
            throw  new Error("Invalid status");
        }
        const connectionRequests = await ConnectionRequest.findOne({
    
               _id:requestId,
                status:"interested",
                touserId: loginuser._id
               
            
    }).populate("fromuserId","firstName ,lastName");
        if(!connectionRequests){
            throw new Error("Connection request not found");
        }
      
        connectionRequests.status = status;
        await connectionRequests.save();
        res.status(200).send(`Connection request marked as '${status}' for user with ID: ${connectionRequests.fromuserId}` );

        
    } catch (error) {
        res.status(404).send(error.message);
    }

})

connectionRouter.get('/')

module.exports = connectionRouter ;