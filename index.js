const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const viewerRoute = require("./routes/viewers");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const contactRoute = require("./routes/contacts");
const multer = require("multer");
const bodyParser = require('body-parser');


const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./helpers/documentation");


app.use("/documentation", swaggerDoc.serve)
app.use("/documentation", swaggerDoc.setup(swaggerDocumentation))



dotenv.config();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("Connected to MongoDB")).catch((err)=>console.log(err));

// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {cb(null, "images");},
// filename:(req,file,cb) => {cb(null,"hello.jpeg");},
// });

// const upload = multer({storage:storage});
// app.post("/api/upload",upload.single("avatar"),(req,res)=>{res.status(200).json("File has been uploaded ");});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/contacts",contactRoute);
app.use("/api/viewers",viewerRoute);
app.use("/api/comments",commentRoute);
app.listen("5000", ()=>{
    console.log("Backend is running.");
});

module.exports = app