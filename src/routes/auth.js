import { Router } from "express";
import User, { findOne } from "../models/User";
import { genSalt, hash, compare } from "bcrypt";

const router = new Router();

//register user

router.post("/register", async (req, res) => {
  try {
    const salt = await genSalt(10);
    const hashedPass = await hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Do Login
router.post("/login", async (req, res) => {
  try {
    const user = await findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credentials");

    const validated = await compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Credentials");

    const { password, ...others } = await user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
