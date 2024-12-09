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

module.exports ={
    validateSignupdata

}