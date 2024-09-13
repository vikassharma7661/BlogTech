const JWT = require("jsonwebtoken")
const secret = "Aquaman123"

function createTokenAuth(user){
    const payload = {
        _id: user._id ,
        email: user.email,
        profilepicture: user.profilepicture,
        role: user.role
    }
    const token =  JWT.sign(payload,secret)
    return token
}

function validateToken(token) {
   const payload = JWT.verify(token, secret)
   return payload;
}
module.exports={
    createTokenAuth,
    validateToken
}