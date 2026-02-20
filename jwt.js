const jwt=require('jsonwebtoken');
const jwtauth=(req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth) res.status(401).json({error:"Token not found"});
    const token=req.headers.authorization.split(' ')[1];
    if(!token) res.status(401).json({error:"Unautorized"});
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Internal server error"});
    }
}
const gentoken=(data)=>{
    return jwt.sign(data,process.env.JWT_SECRET,{expiresIn: 300000});
}
module.exports={jwtauth,gentoken};