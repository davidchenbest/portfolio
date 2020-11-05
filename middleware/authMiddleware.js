const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtAuth(req,res,next){
    let jwtToken = req.cookies.jwt
    if(jwtToken){
        jwt.verify(jwtToken, process.env.SECRET,(err,decodedToken)=>{
            if (err) res.redirect('/blog')
            else{
                next()
            }
        })
    }
    else res.redirect('/blog')
}

module.exports = jwtAuth