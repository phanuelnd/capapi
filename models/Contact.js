const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required: true,
        unique:false,
    },
    email:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    }
   
},
{timestamps:true}
);

module.exports = mongoose.model("Contact",ContactSchema);