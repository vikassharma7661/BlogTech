const {Router } = require("express")
  const router = Router();
  const multer = require('multer')
  const path = require('path')
  const Blog = require('../models/blog')
  const User = require('../models/user');
  const Comment = require('../models/comment')
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/upload/'))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName )
    }
  })
  
  const upload = multer({ storage: storage })


  router.post("/comment/:blogId", async(req,res)=>{
    console.log("one")
     await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
  })
router.get('/new-blog', (req,res)=>{
    res.render("addblog",{
        user: req.user
    })


   
})
router.post('/', upload.single('coverImageURL') , async (req,res)=>{
  const {title, body} = req.body;
       const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/upload/${req.file.filename}`
       })
return res.redirect(`/blog/${blog._id}`) 
})

router.get('/:id', async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({ blogId : req.params.id }).populate("createdBy")
    console.log("comment",comments)
    res.render("blog", {
        blog,
        user: req.user,
        comments,
    })
})

  module.exports= router;