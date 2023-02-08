import { Router } from "express";
import User from "../models/User";
import Post from "../models/Post";

import auth from "../middleware/authenticate";
const router = new Router();

//Create new Blog
router.post("/new",/* auth,*/ async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update the blog

router.put("/edit/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your blog");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete the blog

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Blog is now deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your blog");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//add a comment to the blogs
router.post("/:id", async (req, res) => {
  const newComment = (req, res) => {
    let id = req.params.id;
    let newComment = req.body.comments;
    const comment = {
      text: newComment,
      date: new Date(),
    };
    blogs.findById(id, (err, data) => {
      if (err || !data || !newComment) {
        return res.json({ message: "blog doesn't exist.", idd: id });
      } else {
        data.comments.push(comment);

        data.save((err) => {
          if (err) {
            return res.json({ message: "Comment failed to add.", error: err });
          }
          return res.json(data);
        });
      }
    });
  };
});

// GET Blog

// router.get(":/id", async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         res.status(200).json(post);

//     }
//         catch (err) {
//             res.status(500).json(err);
//     }
// });
// get a blog by ID

router.get(":/id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
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
