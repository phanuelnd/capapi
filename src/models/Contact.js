import { Schema, model } from "mongoose";
const ContactSchema = new Schema(
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

export default model("Contact",ContactSchema);