const express = require('express');
const { userAutho } = require('../middleware/userAutho');
const { validateProfileedit } = require('../utils/validation');
const profileRouter = express.Router();
const user = require('../models/user')
const bcrypt = require('bcrypt');
const validator = require('validator');


profileRouter.get('/profile',userAutho,(req,res)=>{
    try {
        const users =  req.user;
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message)
        
    }


});

profileRouter.patch('/profileedit',userAutho,async(req,res)=>{
    try {
        if(!validateProfileedit(req)){
            throw new Error("invald edit request");
        }
        const loginuser= req.user;
        Object.keys(req.body).forEach((key)=>loginuser[key]=req.body[key]);

        await loginuser.save();
        res.json({
            message: `${loginuser.firstName}, your profile updated successfuly`,
            data: loginuser,
          });
        
    } catch (error) {
        res.status(400).send(error.message)
    }

});

profileRouter.patch('/profile/forgotpassword',async(req,res)=>{
    const {email,newpassword} = req.body;
    try {
            if(!validator.isEmail(email)){
                 throw new Error("Invalid email");
             }
             //find the user in the database
             const users = await user.findOne({ email })
             if(!users){
                 throw new Error("User not found");
             }
             //encrypt the newpassword 
    const passwordhash = await bcrypt.hash(newpassword,10);
    users.password = passwordhash;
    await users.save();
    res.send("passsword updated sucessfully");
 } catch (error) {
        res.status(404).send(error.message)
    }

})


module.exports = profileRouter