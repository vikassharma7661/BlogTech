const express = require("express")
const path = require('path');
const mongoose = require('mongoose')
const { resolve } = require("path/posix");
const userRoute = require('./route/user');
const cookieParser = require("cookie-parser");
const User = require("./models/user")
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const blogRoute = require('./route/blog')
const app = express();
require('dotenv').config();
const port =  process.env.PORT || 3000;
const Blog = require('./models/blog')
app.use(express.urlencoded({extended:false}))
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static((path.resolve('./public'))))



// const mongoURL = process.env.MongoDB_LOCALURL;
const mongoURL = process.env.MongoDB_URL;

mongoose.connect(mongoURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {  // Corrected here
   console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
   console.error("Error connecting to MongoDB:", err);
});

// mongoose.connect('mongodb://localhost:27017/Blogtech').then(()=> console.log("mongo connect"))
// mongoose.connect('mongodb://localhost:27017/Blogtech').then(()=> console.log("mongo connect"))

app.set("view engine", 'ejs')
app.set('views' , path.resolve('./views') )
app.get('/' , async(req,res)=>{
   const allBlogs = await Blog.find({})   
   res.render("home",{
      user: req.user,
      blogs: allBlogs,   
   })
})
 app.use('/users', userRoute)
 app.use('/blog' , blogRoute)
app.listen(port, ()=> console.log(`server run this ${port} port`))