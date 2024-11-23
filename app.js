 const express = require('express');
 const cookieParser = require('cookie-parser');
 const userModel = require("./models/user.model");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const expressSession = require('express-session');
 const flash = require('connect-flash');
 const app = express();
 require("./config/db.config");
app.set("view engine","ejs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hjagshkncbhjakskzbchkj"
}));
app.use(flash());


app.get("/",(req,res)=>{
res.render("welcome")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login", async (req,res)=>{
    let = {username,password} = req.body
  let user =  await userModel.findOne({username})
  if(!user) {
    req.flash("error","username or password is incorrect")
    return res.redirect("/login")
  }
  bcrypt.compare(password, user.password,(err,result)=>{
if(result){
    let token =  jwt.sign({username},"secret") // this is wrong way to store "secret" here i writen for the learning purpose..
    res.cookie("token",token)
    res.redirect("/profile")
  }
  else{
    req.flash("error","username or password is incorrect")
    return res.redirect("/login")
  }
  })
})

app.get("/profile",(req,res)=>{
    res.render("profile")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    let {username,password} = req.body
   let user = await userModel.findOne({username})
   if (user) {
    req.flash("error","Account already exists , please login")
      return res.redirect("/register")
   }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
          await  userModel.create({
                username,
                password :hash,
            })
           let token = jwt.sign({username},"secret",) // this is wrong way to store "secret" here i writen for the learning purpose..
           res.cookie(token,"token");
           res.redirect("/profile")
            
        })
    })

});



app.listen(3000,()=>{
    console.log("listening on port 3000");
    
})
