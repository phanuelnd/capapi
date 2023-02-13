import { Router } from "express";
import User from "../models/User";
import Post from "../models/Post";

import auth from "../middleware/authenticate";
const router = new Router();

//Create new Blog
router.post("/new", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update the blog

router.put("/edit/:id",auth,async (req, res) => {
  
    const post = await Post.findById(req.params.id);

 const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
});

//delete the blog

router.delete("/delete/:id",auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
    
        await post.delete();
        res.status(200).json("Blog is now deleted");
      
    } else {
      res.status(401).json("You can delete only your blog");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get all blogs

router.get("/all", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
