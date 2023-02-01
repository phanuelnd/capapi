import { Schema, model } from "mongoose";
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    comment: [{ text: String, date: { type: String, default: new Date() } }],
  },
  { timestamps: true }
);

export default model("Post", PostSchema);
