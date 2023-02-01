import { Router } from "express";
import Category, { find } from "../models/Category";

const router = new Router();
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(500).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//all categories

router.get("/", async (req, res) => {
  try {
    const cats = await find();

    res.status(500).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
