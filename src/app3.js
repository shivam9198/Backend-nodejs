const express = require('express');
const app = express();
const connectDb = require('./config/database');
const user = require('./models/user');
const user2 = require('./models/user2');
const {validateSignupdata} = require('./utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator');






connectDb()
.then(()=>{
    console.log("database connection is established");
    app.listen("777",()=>{
     
        console.log("listening on a port 777");
    });
}
   
)
.catch( ()=>{
    console.error("database can not be connect ")
}

);
app.use(express.json());

//signup api with encrypt user password
app.post("/signup",async(req,res)=>{
   // creating a new instance

   
    try {
        const {email , password, firstName , lastName} = req.body;
         validateSignupdata(req)
         //creating a hashpassword{encrypting a password}
         const hashpassword =  await bcrypt.hash(password, 10);
         console.log(hashpassword)

      const users = new user({
        firstName , lastName , email ,password: hashpassword
      })
         await users.save();
         res.status(200).send("data is saved successfully");
;    } 
    catch (error) {
        res.send(error.message);
    }
})

//login api with decrypt user password
app.post("/login",async(req ,res)=>{
    try {
        const {email , password} = req.body;
        //validate email 
        if (!validator.isEmail(email)){
            throw new Error("invalid email");
        }
        const users = await user.findOne({ email: email });
        if(!users){
            throw new Error("Invalid email or password");
        }
        //decrypt password
        const  isMatch = await bcrypt.compare(password,users.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        }
        res.status(200).send(users);

        
    } catch (error) {
        res.send(error.message)
    }
})







//this is api level validation allwing only those field which where in the allowedupdate section
app.patch("/signup/:userId",  async(req, res)=>{ //getting userId with the help of params 
    const data = req.body;
    const userId = req.params?.userId;
    try {
        const AllowedUpdate = ["age","password","firstName","lastName","profilePic","skills",] ;
        const isUpdateAllowed =  Object.keys(data).every((k)=>
              AllowedUpdate.includes(k)
                );
        if(!isUpdateAllowed){
            throw new Error("update is not allowed");
        }
        //this is to cheak that in the skills array there should only be a unique skils and then update allows only
        if(data.skills!==undefined){
            const uniqueSkills =[...new Set(data.skills)];
            if(uniqueSkills.length!==data.skills.length){
                throw new Error("skills should not contain duplicate values");
            }
            // this validator is to cheak thay the skills is not more than 50 length 
            if(data.skills.length>50){
                throw new Error("skills should not exceed 50");
            }

        }
       
        const users = await user.findByIdAndUpdate(userId,data,{
            new:true,
            runValidators:true
        });
        res.send("user updated successfully");


        
    } catch (error) {
        res.send(error.message);
        
    }


})

// app.get("/feed",async (req,res)=>{
//     try {
//         const users =   await user.find({});
//       res.send(users);

        
//     } catch (error) {
//         console.log(error);
//     }

// })

//fidnAndUpdate the data in the databas
app.post("/feed",async(req,res)=>{
    const {id,newpassword} = req.body;
try {
    const users = await user.findByIdAndUpdate(id,{"password":newpassword}, { new: true, runValidators: true });//custom validator to validate the schema during the updattion
    // const users = await user.findOne({firstName});
    res.send("password change sucesfully");
    
} catch (error) {
   res.send(error.message);
}
})


// app.post("/feed", async(req,res)=>{
//     const email = req.body.email;
//     try {
//         const users = await user.findOneAndUpdate({email},{email: "shivamkashyap9198@@gmail.com"});
//         res.send(users);

        
//     } catch (error) {
//         console.log(error);
//     }

// })

//
 
app.post("/feed", async(req,res)=>{
    const {email} = req.body;
    try {
        const users = await user.findOneAndDelete({email});
        res.send("users delted sucessfully");
        
    } catch (error) {
        console.log(error);
    }
})
app.post("/user2",async(req,res)=>{
    try {
        const userdata = new user2({
            "firstName": "alex",
            "lastName": "kashyap",
            "gender": "male",
            "age":"22"
        }) 
        await userdata.save();
        res.status(200).send("user2 data is saved successfully");

        
    } catch (error) {
        console.log(error);
        
    }
})