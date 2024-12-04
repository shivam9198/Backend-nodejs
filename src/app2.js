const express = require('express');
const app = express();
const {adminauth}=require('./middleware/autho');

const {userauth}= require('./middleware/userauth')
app.listen(777, ()=>{
    console.log("server is listening at port 777");
})

app.use("/admin",adminauth);
app.use("/user",userauth);


app.get('/user/getalldata',(req,res)=>{
    res.send("user all data");
})

app.get('/user/delete',(req,res)=>{
    res.send("user deleted");
})



app.get('/admin/getdata',(req,res)=>{
    res.send("This is protected amdin data");
})
app.get('/admin/deletedata',(req,res)=>{
    res.send("this admin data is deleted");
})
