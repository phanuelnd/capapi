import { genSalt, hash } from "bcrypt";
import User from '../models/User'
export const updateUser = async (req, res) => {

    if (req.body.password) {
      const salt = await genSalt(10);
      req.body.password = await hash(req.body.password, salt);
    }

    try {
      // await Post.deleteMany({ username: _username });
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if(!updatedUser){
     res.status(409).json({error:"user with provided is is not exist"})
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
};
