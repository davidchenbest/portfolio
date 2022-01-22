const express = require('express');
const routes = express.Router()

routes.get('/', (res, req) => {
    req.json(6)
})

module.exports = routes