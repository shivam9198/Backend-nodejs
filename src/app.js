const express = require('express');
const app = express();

//routes order matter a lot "/ phle h to / wale code he execute honge and uske baad agr tumne /home ya /game kuch bhi likha h wo nhi match hoga keval / se smaje nhi smj ayaa to code dekha gnd ke andhe"

// app.use("/",(req,res)=>{
//     res.send("hello from the shivam and alex ");
// })

app.use("/home",(req,res)=>{
    res.send("welcome to the home");
})


app.use("/game",(req ,res)=>{
    res.send("wellcome to the game zone");
})


app.listen(777, ()=>{
    console.log("Serveris listening on port 777");
})