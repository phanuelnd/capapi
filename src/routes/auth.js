const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userSchema} = require("../helpers/validation_schema");

 
//register user

router.post("/register", async (req, res)=>{
    try{
        const result = await userSchema.validateAsync(req.body)
   console.log(result);
   
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
} );
//Do Login 
router.post("/login", async (req, res)=> {
    try{

        const user = await User.findOne({username: req.body.username})
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

module.exports = router;