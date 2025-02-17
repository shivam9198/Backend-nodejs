const express = require('express');
const app = express();
const connectDb = require('./config/database');
const cokkieparser = require('cookie-parser') ;
const cors = require('cors');


const authoRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const connectionRouter = require('./routes/Connection');
const userRouter =  require('./routes/user');



app.use(express.json());
app.use(cokkieparser());
app.use(cors( {  //this the middleware cors middle ware used to resolev the cros oringin eror and 
    origin : "http://localhost:5173", // we have to five the origin of our fronted app
    credentials : true ,//this is used to allow the cokkie to be set in the browser
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use('/',authoRouter);
app.use('/',profileRouter);
app.use('/',connectionRouter);
app.use('/',userRouter);







connectDb()
.then(()=>{
    console.log("database connection is established");
    app.listen("3000",()=>{
     
        console.log("listening on a port 777");
    });
}
   
)
.catch( ()=>{
    console.error("database can not be connect ")
}

);







































// //this is api level validation allwing only those field which where in the allowedupdate section
// app.patch("/signup/:userId",  async(req, res)=>{ //getting userId with the help of params 
//     const data = req.body;
//     const userId = req.params?.userId;
//     try {
//         const AllowedUpdate = ["age","password","firstName","lastName","profilePic","skills",] ;
//         const isUpdateAllowed =  Object.keys(data).every((k)=>
//               AllowedUpdate.includes(k)
//                 );
//         if(!isUpdateAllowed){
//             throw new Error("update is not allowed");
//         }
//         //this is to cheak that in the skills array there should only be a unique skils and then update allows only
//         if(data.skills!==undefined){
//             const uniqueSkills =[...new Set(data.skills)];
//             if(uniqueSkills.length!==data.skills.length){
//                 throw new Error("skills should not contain duplicate values");
//             }
//             // this validator is to cheak thay the skills is not more than 50 length 
//             if(data.skills.length>50){
//                 throw new Error("skills should not exceed 50");
//             }

//         }
       
//         const users = await user.findByIdAndUpdate(userId,data,{
//             new:true,
//             runValidators:true
//         });
//         res.send("user updated successfully");


        
//     } catch (error) {
//         res.send(error.message);
        
//     }


// })


//fidnAndUpdate the data in the databas
// app.post("/feed",async(req,res)=>{
//     const {id,newpassword} = req.body;
// try {
//     const users = await user.findByIdAndUpdate(id,{"password":newpassword}, { new: true, runValidators: true });//custom validator to validate the schema during the updattion
//     // const users = await user.findOne({firstName});
//     res.send("password change sucesfully");
    
// } catch (error) {
//    res.send(error.message);
// }
// })


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
 
// app.post("/feed", async(req,res)=>{
//     const {email} = req.body;
//     try {
//         const users = await user.findOneAndDelete({email});
//         res.send("users delted sucessfully");
        
//     } catch (error) {
//         console.log(error);
//     }
// })
