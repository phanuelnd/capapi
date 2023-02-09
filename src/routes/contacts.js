const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");

// import { contactSchema } from "../validations/validation_schema";
// const auth = require("../middleware/authenticatemessage");

//Create new message

router.post("/new", async (req, res) => {
  const newContact = new Contact(req.body);

  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//deleting the message

router.delete("/delete/:id", async (req, res) => {
  try {
    const contact = await findById(req.params.id);
    if (contact.username === req.body.username) {
      try {
        await contact.delete();
        res.status(200).json("Message is now deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single message

router.get(":/id", async (req, res) => {
  try {
    const message = await Contact.findById(req.params.name);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all message

router.get("/allme", async (req, res) => {
  const name = req.query.user;
  try {
    let contacts;
    if (name) {
      contacts = await Contact.find({ name });
    } else {
      contacts = await Contact.find();
    }
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
