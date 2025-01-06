const jwt = require('jsonwebtoken');
const user = require('../models/user')
const userAutho =async (req,res,next)=>{
    try {
        //read the token 
    const {token} = req.cookies;
    if(!token){
        throw new Error("Invalid cookie");
    }
    //validate the token 
    const decodedMessage = await jwt.verify(token,"Scretkey");
    if(!decodedMessage){
        throw new Error("Invalid token");
    }
    const {_id} = decodedMessage;

    //find the user
    const users = await user.findById({_id});
    if(!users){
        throw new Error("User not found");
    }
    req.user = users;
    next();

}
 catch (error) {
        res.send(error.message)
    }
}
    

module.exports = {
                   userAutho}