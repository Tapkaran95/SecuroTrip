let express = require("express");
let router =  express.Router();
let uniqid = require("uniqid");
let Post = require("../models/post").Post;
// Using  request this we can redirect request from one file to another
// Also here we will see only the end of routrPath that's why we are writting only / in routePath
let autoMiddleware = require("../middleware/auth");
router.get("/",async(req,res)=>{
    // To see all the posts from database
    let post = await Post.find();
    res.send(post);
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id;
    let posts = await Post.findOne({id:id});
    res.send(posts);
})
router.post("/",autoMiddleware,async (req,res)=>{
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageURL) {
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.substring(req.file.path.lastIndexOf("i"), req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text:reqBody.text,
        country:reqBody.country,
        imageURL: imgPath,
        hotel:reqBody.hotel,
        safety:reqBody.safety
      })
    await newPost.save();
    // console.log(req.file);
    res.send("Created");
})
router.delete("/:id",autoMiddleware,async(req,res)=>{
    let id = req.params.id;
    await Post.deleteOne({id:id});
    res.send("Deleted");
})
router.put("/:id",autoMiddleware,async (req, res)=>{
    let id = req.params.id;
    let post = await Post.updateOne({id: id}, req.body);
    res.send(post)
})

module.exports = router;