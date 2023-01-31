const router = require("express").Router();
const Viewer = require("../models/Viewer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {viewerSchema} = require("../helpers/validation_schema");
const auth = require("../middleware/authenticate");

 
//register new client

router.post("/register", async (req, res)=>{
    try{
        const result = await viewerSchema.validateAsync(req.body)
   console.log(result);
   
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newViewer = new Viewer({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newViewer.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
} );
//Do Login 
router.post("/login", async (req, res)=> {
    try{

        const user = await Viewer.findOne({email: req.body.email})
        !user && res.status(400).json("Wrong Credentials")
       
        const  validated = await bcrypt.compare(req.body.password, user.password)
     !validated && res.status(400).json("Wrong Credentials")

   const token = jwt.sign({user},'mykey')
   
     const {password, ...others} = await user._doc;

        res.status(200).json({others,token}); 
    }
    catch(err){res.status(500).json(err);
    }
});

//Update user's information
router.put("/:id", async (req, res)=>{
    
    if(req.body.userId === req.params.id){

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
    
    try{ 
        await Viewer.deleteMany({name:Viewer.name})
       const updatedUser = await Viewer.findByIdAndUpdate(req.params.id, {
        $set: req.body,
       },{new:true});
       res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
}
    else{
        res.status(401).json("You can only update your account information.");

    }
} );


//delete the viewer 

router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id){
        try{
    const user =  await Viewer.findById(req.params.id);
    try{
       await Viewer.findByIdAndDelete(req.params.id);
       res.status(200).json("User has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
 } catch(err){
    res.status(404).json("User not found!")
 }
}
    else{
        res.status(401).json("You can delete only your account");

    }
});

module.exports = router;