const userauth = (req,res,next)=>{
    const token = "123456789";
const userauthentication = token === "123456789";
if(!userauthentication){
    res.status(403).send("unauthorixed axis");

}
else{
    next();
}

}
module.exports = {
    userauth
}