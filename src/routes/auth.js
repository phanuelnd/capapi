import { Router } from "express";
import User from "../models/User";
import { sign } from "jsonwebtoken";
import { genSalt, hash, compare } from "bcrypt";
const router = new Router();

//register user

router.post("/register", async (req, res) => {

    const salt = await genSalt(10);
    const hashedPass = await hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      userType: req.body.userType || 'user'
    });
    try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Do Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Wrong Credentials");
    }
    const validated = await compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong Credentials");
    }

    const token = sign({ user }, "mikey");

    const { password, ...others } = await user._doc;

    res.status(200).json({ others, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
