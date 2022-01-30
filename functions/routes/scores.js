const express = require('express');
const routes = express.Router()
const nbaRoute = require('./nba')

routes.use('/nba', nbaRoute)

module.exports = routes