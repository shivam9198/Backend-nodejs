const validator = require('validator');

const validateSignupdata = (req)=>{
    const {firstName ,lastName,email, password ,skills } = req.body;
    if(!firstName||!lastName){
        throw new Error("name is not valid");
    }
    else if(!email){
        throw new Error("email is required");
    }
    else if(!password){
        throw new Error("Password is required");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid email");
    }
   

    else if(!validator.isStrongPassword(password)){
        throw new Error("try another password");
    }
    else if(skills.length>10){
        throw new Error("skills should be less than 10");
    }

}
const validateProfileedit = (req)=>{
    const allowedFields = ["firstName","lastName","skills","bio","dateOfBirth","age","profilePic","gender","socialLinks"];
    const isUpdateAllowed = Object.keys(req.body).every((field)=>(
        allowedFields.includes(field)
    ));
  
    return isUpdateAllowed;
}

module.exports ={
    validateSignupdata ,validateProfileedit

}