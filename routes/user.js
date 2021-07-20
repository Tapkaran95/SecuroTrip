let express = require("express");
let router =  express.Router();
let User = require("../models/users").User;
let auth = require("../controllers/auth");
let bcrypt = require("bcrypt");
// const { Console } = require("console");
router.post("/login",async (req,res)=>{
    let reqBody = req.body;
    let email = reqBody.email;
    let password = reqBody.password;
    let user = await User.find().where({email:email});
    if(user.length > 0){
      let comparisionResult = await bcrypt.compare(password, user[0].password);
      
      if(comparisionResult){
        let token  = auth.generateToken(user[0]);
        res.cookie( 'auth_token', token );
        res.send({
          redirectURL: "/admin"
        });
      }else{
        res.status(400);
        res.send("Rejected");
      }
    }else{
      res.status(400);
      res.send("Rejected");
    }
})
module.exports = router;
router.post("/register",async (req,res)=>{
  let reqBody = req.body;
  let email = reqBody.email;
  let password = reqBody.password;
  let user = await User.find().where({email:email});
  // console.log(user);
  if(user.length === 0){
    let encryptedPass = await bcrypt.hash(password, 12);
    let newUser = new User({
      email: email,
      password: encryptedPass
    })
    await newUser.save();
    res.send("DONE!");
  }else{
    res.send("Rejected");
  }
})
module.exports = router;
 