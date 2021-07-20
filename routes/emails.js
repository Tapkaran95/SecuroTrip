let express = require("express");
let router =  express.Router();
let uniqid = require("uniqid");
let Email = require("../models/mails").Email;

let autoMiddleware = require("../middleware/auth");
router.get("/",autoMiddleware, async(req,res)=>{
    res.send(await Email.find());
    // res.send(email);
})

router.post("/", async(req,res)=>{
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    })
   await newEmail.save();
    res.send("Saved");
})

router.delete("/:id", autoMiddleware,async(req,res)=>{
    let id = req.params.id;
    await Email.deleteOne({id:id});
    res.send("Deleted");
})
module.exports = router;