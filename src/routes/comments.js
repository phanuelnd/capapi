import { Router } from "express";

const router = new Router();
// creating a comment

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Getting all the comments

router.get("/", async (req, res) => {
  try {
    const comm = await Comment.find();

    res.status(200).send(comm);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//deleting a comment

router.delete("/:id", async (req, res) => {
  if (req.body.commentId === req.params.id) {
    try {
      const user = await Comment.findById(req.params.id);
      try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send("Comment has been deleted");
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (err) {
      res.status(404).send("Comment doesn't found!");
    }
  } else {
    res.status(401).json("You can delete only your comment");
  }
});

export default router;
