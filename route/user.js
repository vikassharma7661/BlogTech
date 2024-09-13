const {Router } = require("express")
  const router = Router();
  const User = require('../models/user')
  
  router.get('/signup', (req, res) => {
    res.render("signup")
  })
  router.get('/signin', (req, res) => {
    res.render("signin")
  })
  router.post('/signin', async (req, res) => {
    const { email,password } = req.body;
    try{
      console.log("first")
      const token = await User.MatchPasswordandCreateToken(email,password);    
       return res.cookie("token" , token).redirect("/")
       const users = await User.find({})
       res.locals.user = users;
    }
     catch(error)
    {
      res.render("signin",
      { 
      error: "incorect password"}
  )}
    
  })
  router.post('/signup', async (req,res)=>{
    const {Fullname,email,password} = req.body;
   await User.create({
    Fullname,
    email,
    password
   })
   return res.redirect('/')
  })
  router.get('/logout', (req, res) => {
    // Clear JWT token cookie if using JWT
    res.clearCookie('token'); // Ensure 'token' matches your cookie name

    // If using sessions, destroy the session
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.redirect('/'); // Redirect to home or show an error message
            }
            // Redirect to home page after successful logout
            res.redirect('/');
        });
    } else {
        // If no session is used, just redirect
        res.redirect('/');
    }
});

  // router.get('/logout', (req, res) => {
  //       res.clearCookie("token");
  //   res.redirect('/');
  // });
  module.exports= router;