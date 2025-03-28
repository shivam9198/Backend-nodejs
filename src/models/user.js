const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Invalid email");
            
        }
    }},
      age:{
        type: Number,
        min:18,

    },
    password:{
        type: String,
        // required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid password. Password should be at least 8 characters long and contain at least 1 uppercase,1 lowercase,1 number, and 1 special character.");
    
        }
       
    }},
     profilePic:{
         type: String,
         default :"https://imgs.search.brave.com/gxCbEM2l_nRW9ROLoaUzhpkPNmSOgpcdNYZjIk8svTY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by91/c2VyLXByb2ZpbGUt/aWNvbi1mcm9udC1z/aWRlXzE4NzI5OS0z/OTU5Ni5qcGc_c2Vt/dD1haXNfaHlicmlk",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid profile picture URL");
 
            }
         }
        },
        isPremium:{
    type:Boolean,
    default: false,
},
membershipType:{
    type:String,
},


     dateOfBirth:{
        type: Date,
        // required:true,
        validate(value){
            if(!value){
                throw new Error("date of birth is required");
            }
        }
     },
     gender:{
        type: String,
        validate(value){
            if(!["Male","Female","other"].includes(value)){
                throw new Error("gender must be Male, female, or other");
            }
        }},
     
     bio:{
       type: String,
       maxlength:100,
        default: "No bio provided",
},
     skills:{
        type: [String],
        default: ["No skills provided"],
       
     },
    socialLinks:{
        type:[String],
        default: ["No social media links provided"],

    }







},{timestamps:true} );


userSchema.methods.verifyPassword =async function(passwordinterByuser){
    const users = this;
    const hashPassword = users.password
     const ispasswordValid = await bcrypt.compare(passwordinterByuser,hashPassword);
     return ispasswordValid;




}

userSchema.methods.getjwt = async function(){
    const users = this;
    const token = await jwt.sign({_id:users.id},"Scretkey");
    return token;


}



module.exports  = mongoose.model("User", userSchema);


