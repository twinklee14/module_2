export const createAdmin= async (req,res)=>{
    try{
        if(!await checkrole(req.user.id)){
            return res.status(401).json({error:"not authorized"});
        }
        const data=req.body;
        const newAdminPost=new user(data);
        const response=await newAdminPost.save();
        return res.status(200).json({response:response});
    }
    catch(err){
        return res.status(404).json({error:"Internal Server error"});
    }
}