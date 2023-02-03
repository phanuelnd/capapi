import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

import multer from "multer";
import bodyParser from "body-parser";

import { serve, setup } from "swagger-ui-express";
import swaggerDocumentation from "./docs/documentation";

import indexRouter from "./routes";

const app = express();
app.use(json());
app.use("/documentation", serve);
app.use("/documentation", setup(swaggerDocumentation));

app.use("/api", indexRouter);

config();

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to MongoDB");
    }
  })
  .catch((err) => console.log(err));

// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {cb(null, "images");},
// filename:(req,file,cb) => {cb(null,"hello.jpeg");},
// });

// const upload = multer({storage:storage});
// app.post("/api/upload",upload.single("avatar"),(req,res)=>{res.status(200).json("File has been uploaded ");});

app.listen("5000", () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Backend is running.");
  }
});

export default app;
