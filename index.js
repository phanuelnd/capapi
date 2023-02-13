const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const contactRoute = require("./routes/contacts");
const multer = require("multer");
const cors = require('cors')

const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("Connected to MongoDB")).catch((err)=>console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/contacts",contactRoute);


app.listen("5000", ()=>{
    console.log("Backend is running.");
});

module.exports = app