const { validateToken } = require('../servies/authentication')
function checkForAuthenticationCookie(cookiename){
    return (req,res,next) =>{
        const tokenCookieValue = req.cookies[cookiename]
        if(!tokenCookieValue){
          return  next();
        }
        try{
            const payload = validateToken(tokenCookieValue);
            req.user = payload

        }
        catch(error){}
        return next();
    }


}

module.exports= {
    checkForAuthenticationCookie
}