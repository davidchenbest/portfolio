const express = require('express');
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

function handleErrors(err) {
    let obj = { errors: {} }
    if (err.errors.email) {
        obj.errors.email = err.errors.email.message
    }
    if (err.errors.password) {
        obj.errors.password = err.errors.password.message
    }
    
    return obj

}

const maxTime = 60 * 60;
function createToken(id){
    return jwt.sign({id}, process.env.SECRET,{
        expiresIn:maxTime
    })

}

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log('Post Login: ' + email, password);
    try {
        let user = await User.login(email, password)
        let token = createToken(user._id)
        res.cookie('jwt', token,{httpOnly:true, maxAge:maxTime*1000})
        res.cookie('jiachenuser', email,{maxAge:maxTime*1000})
        res.json({_id:user._id})
    }
    catch (err) {
        res.json({errors:'Incorrect'})
    }
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '',{httpOnly:true, maxAge:1})
    res.cookie('jiachenuser', '',{maxAge:1})
   res.redirect('home')
})

// router.post('/signup', async (req, res) => {
//     try {
//         let user = await User.create(req.body)
//         res.json(user)
//     }
//     catch (err) {
//         res.json(handleErrors(err))
//     }


// })

module.exports = router