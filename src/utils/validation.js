const validator = require('validator');

const validateSignupdata = (req)=>{
    const {firstName ,lastName,email, password  } = req.body;
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
  

}
const validateProfileedit = (req)=>{
    const {firstName ,lastName, age, } = req.body;
    const allowedFields = ["firstName","lastName","skills","bio","dateOfBirth","age","profilePic","gender","socialLinks"];
    if(age<18){
        throw new Error("age should be greater than 18");
    }
    if(!firstName || !firstName.trim()){
        throw new Error("first name cannot be empty");
}
     if(!/^[A-Za-z\s]+$/.test(firstName)){
    throw new Error("first name should contain only letters");
}
    if(!/^[A-Za-z\s]+$/.test(lastName)){
    throw new Error("last name should contain only letters");
}

    const isUpdateAllowed = Object.keys(req.body).every((field)=>(
        allowedFields.includes(field)
    ));
  
    return isUpdateAllowed;
}

module.exports ={
    validateSignupdata ,validateProfileedit

}