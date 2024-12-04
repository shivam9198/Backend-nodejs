const adminauth = (req,res,next)=>{
    const token = "12345";
    const isauthorization = token ==="12345";
    if(!isauthorization){
        res.status(403).send("unauthorized");
        
    }
    else{
        next();
    }
    };
    module.exports= {
        adminauth
    }