const express = require('express');
const { validateSignupdata } = require('../utils/validation');
const user = require('../models/user');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');


authRouter.post('/signup',async(req,res)=>{
   
    try {
        //get  data from the user like email pass ... for signup
        const {firstName,lastName,email,password,} = req.body
        //validate signup data
        validateSignupdata(req);
        //create a passwordhash
        const passwordhash = await bcrypt.hash(password,10)
         //creating a users from user-instance
         const users = new user({firstName,lastName,email,password: passwordhash});
         //save users to the database
         await users.save();
       
        res.status(200).send("user created successfully");
        
        
    } catch (error) {
        res.status(400).send(error.message);
        
    }
   

});

authRouter.post('/login',async (req,res)=>{
    //get login details from the user
    const {email ,password} = req.body;
    try {
        //validate email and password
        if(!validator.isEmail(email)){
            throw new Error("Invalid email");
        }
        //find the user in the database
        const users = await user.findOne({ email })
        if(!users){
            throw new Error("User not found");
        }
        //decrypt the password
        const isMatch = await users.verifyPassword(password);
        if(!isMatch){
            throw new Error("Invalid password");
        }
        //create a jwt token
        const token = await users.getjwt();
        //set the cookie with jwt token
        res.cookie("token",token);
        //send back the response with a success message
        res.status(200).send(users);


    } catch (error) {
        res.status(404).send(error.message);
        
    }

})

authRouter.post('/logout',(req,res)=>{
    res.clearCookie("token");
    res.send("logout successfully");
 
})



module.exports= authRouter;