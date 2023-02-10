

import { Router } from "express";
import Contact from "../models/Contact";
const router = new Router();


//Create new message

router.post("/new", async (req, res) => {
  const newContact = new Contact(req.body);

 
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);

});

//deleting the message

router.delete("/delete/:id", async (req, res) => {

    const contact = await Contact.findById(req.params.id);
 
        await contact.delete();
        res.status(200).json("Message is now deleted.");


});



// get all message

router.get("/allme", async (req, res) => {

    let contacts;

      contacts = await Contact.find();
    
    res.status(200).json(contacts);

});
export default router;
