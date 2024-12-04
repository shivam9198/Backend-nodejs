const express = require('express');
const app = express();
const connectDb = require('./config/database');
const user = require('./models/user');
const user2 = require('./models/user2');



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
app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    // creating a new instance
    const users = new user(req.body)
    try {
         await users.save();
         res.status(200).send("data is saved successfully");
;    } 
    catch (error) {
        console.log(error);
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

// app.post("/feed",async(req,res)=>{
//     const {firstName} = req.body;
// try {
//     // const users = await user.findByIdAndUpdate(id,{"firstName":"HomelanderBhaiya"});
//     const users = await user.findOne({firstName});
//     res.send(users);
    
// } catch (error) {
//     console.log(error);
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