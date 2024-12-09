const mongoose = require('mongoose');
const validator = require('validator');

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
            if(!["male","female","other"].includes(value)){
                throw new Error("gender must be male, female, or other");
            }
        }},
     
     bio:{
       type: String,
       maxlength:500,
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

module.exports  = mongoose.model("User", userSchema);


