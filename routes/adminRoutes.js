const express=require('express');
const router=express.Router();
const user=require('./../models/user');
const {jwtauth,genoken}=require('../jwt');
const checkrole= async(id)=>{
    try{
        const user=await user.findById(id);
        if(user.role==='admin'){
            return true;
        }
    }
    catch(err){
        return false;
    }
}
router.post('/post',jwtauth, async (req,res)=>{
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
  })

router.get('/:id', async (req, res) => {
  try {
    const userid = req.params.id;
    if (!userid) {
      return res.status(404).json({ error: "Id not found" });
    }
    const data = await user.findById(userid);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.delete('/:id', jwtauth, async (req, res) => {
  try {
    const userid = req.params.id;
    if (!userid) {
      return res.status(404).json({ error:"Id not found" });
    }
    if (!(await checkrole(req.user.id))) {
      return res.status(401).json({ error:"Not authorized" });
    }
    const response = await user.findByIdAndDelete(userid);
    if (!response) {
      return res.status(404).json({ error:"User not found" });
    }
    return res.status(200).json({ message:"Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error:"Internal server error" });
  }
});

module.exports=router;
