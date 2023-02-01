import { Router } from "express";

import {
  username as _username,
  findByIdAndUpdate,
  findById,
  findByIdAndDelete,
  find,
} from "../models/User";
import Post from "../models/Post";
import { genSalt, hash } from "bcrypt";
import { userSchema } from "../validations/validation_schema";
import { find as _find } from "../models/Viewer";
import auth from "../middleware/authenticate";
import { updateUser } from "../controllers/user.controller";
import User from "../models/User";

const userRouter = new Router();

//update a user
userRouter.put("/edit/:id", updateUser);

//delete the user

userRouter.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
});
// GET SOME USER
userRouter.get(":/id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { passwpord, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all users

userRouter.get("/all", async (req, res) => {
  try {
    const comm = await User.find();
    res.status(500).json(comm);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all Viewers

userRouter.get("/viewers", auth, async (req, res) => {
  try {
    const comm = await Viewer._find();
    res.status(500).json(comm);// check here if the error exists for the viewers
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter;
