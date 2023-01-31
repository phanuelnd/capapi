import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./posts";
import userRouter from "./users";
import categoryRouter from "./categories";
import viewerRouter from "./viewers";
import commentRouter from "./comments";

const router = new Router();

router.get("/", (req, res) => {
  console.log("Welcome to homepage");
  res.status(500).json({ message: "Welcome to m blog site" });
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/viewers", viewerRouter);
router.use("/comment", commentRouter);

export default router;
