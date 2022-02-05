const jwt = require('jsonwebtoken');
const { SECRET } = require('../config')

function jwtAuth(req, res, next) {
    let jwtToken = req.cookies.jwt
    if (jwtToken) {
        jwt.verify(jwtToken, SECRET, (err, decodedToken) => {
            if (err) res.redirect('/blog')
            else {
                next()
            }
        })
    }
    else res.redirect('/blog')
}

function graphqlAuth(req) {
    let jwtToken = req.cookies.jwt
    if (jwtToken) {
        const result = jwt.verify(jwtToken, SECRET, (err, decodedToken) => {
            if (err) return null
            else {
                return true
            }
        })
        if (result) return true
    }
    else {
        return null
    }

}

module.exports = { jwtAuth, graphqlAuth }