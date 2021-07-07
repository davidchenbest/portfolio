const express = require('express')
const router = express.Router()
const { createToken } = require('../utils/auth')
const { maxTime } = require('../config')
const { MongooseCon } = require('../utils/MongooseCon')
const bcrypt = require('bcryptjs')

const login = async (user, password) => {
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const mongooseCon = new MongooseCon()
        const user = await mongooseCon.findOne('User', { email })
        await login(user, password)


        let token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxTime * 1000 })
        res.cookie('jiachenuser', email, { maxAge: maxTime * 1000 })
        res.json(token)
    }
    catch (err) {
        res.json({ errors: 'Incorrect' })
    }
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
    res.cookie('jiachenuser', '', { maxAge: 1 })
    res.redirect('/')
})

router.get('/test', (req, res) => {
    res.send(`test ${process.env.BASE_URL}`)
})

module.exports = { authRoutes: router }