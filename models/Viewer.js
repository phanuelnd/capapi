const mongoose = require("mongoose");
const ViewerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Viewer",ViewerSchema);