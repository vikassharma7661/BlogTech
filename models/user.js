const { Schema, model , Fullname} = require('mongoose');
const crypto = require('crypto'); // Import crypto correctly
const { createTokenAuth } = require("../servies/authentication")
const userSchema = new Schema({
  Fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
    default: "/images/default.png"
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.pre("save", function (next) {
  const user = this;


  if (!user.isModified("password")) return next();


  const salt = crypto.randomBytes(16).toString("hex");


  const hashedPassword = crypto.createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  
  user.salt = salt;
  user.password = hashedPassword;

  next();
});
userSchema.static("MatchPasswordandCreateToken" , async function (email,password){
  const user = await this.findOne({ email })
  if(!user) throw new Error("user not found")
    const salt = user.salt
  const  hashedPassword = user.password
  const providedPassword = crypto.createHmac("sha256", salt)
  .update(password)
  .digest("hex") 

  if ( hashedPassword !== providedPassword ) throw new Error ("incorrect password please chrck agin password")

   const token = createTokenAuth(user)
   return token;
})



const User = model('User', userSchema); 

module.exports = User;
