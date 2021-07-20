let express = require("express");
let app = express();
let mongoose =  require("mongoose");
let Post = require("./models/post").Post;

// We are using ejs to create template of HTML else we have to create many HTML files whenever user clicks details button
app.set("view engine","ejs")
// Installed package uniqid to generate uniqid for each post
// let uniqid = require("uniqid");
//installed multer so that we can add file name easily
let multer = require("multer");
let routerPath = require("./routes/post");
let emailsRouter = require("./routes/emails");
let callbackRequestsRouter = require("./routes/callback-request");
let usersRouter = require("./routes/user")
let cookieParser = require("cookie-parser");
let auth = require("./controllers/auth");
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/travels",{ useNewUrlParser: true } ).then(()=>{
                                                    console.log("Connected")
                                                }).catch((err)=>console.log(err))

app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null, "public/images"),
    filename: (req,file,cb)=> cb(null, file.originalname)
})
app.use(multer({storage:imageStorage}).single("imageFile"));
app.use(express.static("public"));
// Specifying the route path as first argu and router to be used as 2nd argu.
app.use("/posts",routerPath);
app.use("/callback-requests", callbackRequestsRouter);
app.use("/emails",emailsRouter);
app.use("/users",usersRouter);

app.get("/sight",async (req,res)=>{
    let id = req.query.id;
    let post = await Post.findOne({ id:id });
    res.render("sight",{
        title:post.title,
        country:post.country,
        imageURL:post.imageURL,
        text:post.text,
        hotel:post.hotel, 
        date: post.date,
        safety:post.safety
         
    })
})

// let isLoggedIn = false;

// Here only one variable is used for all the users to check whether they are loggedIn or not and this is not recommended method variable has to be unique for all the users
// So recommended method is to use sessions and each sessions stores info about every users that whether the user is logged In or not and all of these sessions are stored in DataBase
// There is one principle stateless. Acc to this principle server can store info about any users when logged In to website
// Now solution is to generate a key for each user and when user is loggedIn server sends the key to the client and client stores the key and for every
// request to the server key is sent. So server checks whether the key is correct and if it is correct user is allowed to sign in otherwise we sent a message as "Rejected" 
// One of the way to implement is by using jsonwebtoken

// Now in order to read cookie by server correctly we will be using cookieparser


app.get("/admin", async(req,res)=>{
    let token = req.cookies['auth_token']
    if(token && auth.checkToken(token)){
        res.render("admin");
    }else{
        // res.render("login");
        res.redirect("/login");
    }
})
app.get("/login", async (req, res)=>{
    res.render("login");
})
// app.get("/about",async(req,res)=>{
//     res.send("/about")
// })
app.listen(3000,()=>{
    console.log("Listening 3000.....")
})