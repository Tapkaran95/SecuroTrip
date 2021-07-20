let express = require("express");
let router =  express.Router();
let uniqid = require("uniqid");
let CallbackRequest = require("../models/callback-request").CallbackRequest;
let autoMiddleware = require("../middleware/auth");


router.get("/", autoMiddleware, async(req, res)=>{
    res.send(await CallbackRequest.find());

});
router.post("/",async (req,res)=>{
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    newRequest.save();
    res.send("Accepted");
})
router.delete("/:id",autoMiddleware,async(req,res)=>{
    let id = req.params.id;
    await CallbackRequest.deleteOne({id:id});
    res.send("Deleted");
})
module.exports = router;