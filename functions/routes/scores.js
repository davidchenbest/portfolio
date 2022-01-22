const express = require('express');
const routes = express.Router()
const fetch = require('node-fetch')
const config = require('../config')
const nbaUrl = config.url.nba.scoreUrl

routes.get('/nba', async (res, req) => {
    const response = await fetch(nbaUrl)
    const data = await response.json()
    req.json(data)
})

module.exports = routes