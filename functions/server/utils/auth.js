const { SECRET, maxTime } = require('../config')
const jwt = require('jsonwebtoken');

function createToken(id) {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxTime
    })

}

module.exports = { createToken }