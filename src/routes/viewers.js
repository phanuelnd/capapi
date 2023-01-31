import { Router } from "express";

import Viewer, {
  findOne,
  deleteMany,
  name as _name,
  findByIdAndUpdate,
  findById,
  findByIdAndDelete,
} from "../models/Viewer";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { viewerSchema } from "../validations/validation_schema";
import auth from "../middleware/authenticate";

const router = new Router();

//register new client

router.post("/register", async (req, res) => {
  try {
    const result = await viewerSchema.validateAsync(req.body);
    console.log(result);

    const salt = await genSalt(10);
    const hashedPass = await hash(req.body.password, salt);
    const newViewer = new Viewer({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newViewer.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Do Login
router.post("/login", async (req, res) => {
  try {
    const user = await findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong Credentials");

    const validated = await compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong Credentials");

    const token = sign({ user }, "mykey");

    const { password, ...others } = await user._doc;

    res.status(200).json({ others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update user's information
router.put("/update/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);
    }

    try {
      await deleteMany({ name: _name });
      const updatedUser = await findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account information.");
  }
});

//delete the viewer

router.delete("/delete/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await findById(req.params.id);
      try {
        await findByIdAndDelete(req.params.id);
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

export default router;
