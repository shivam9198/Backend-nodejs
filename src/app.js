const express = require('express');
const app = express();


app.use("/home",(req,res)=>{
    res.send("hellow from the shivam and alex ");
})

app.use("/game",(req,res)=>{
    res.send("welcome to the game zone");
})
app.listen(777, ()=>{
    console.log("Serveris listening on port 777");
})