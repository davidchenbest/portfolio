const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const scrapeRoute = require('./routes/scrape')
app.use('/functions/server', router);  // path must route to lambda

router.use('/scrape', scrapeRoute)


module.exports = app;
module.exports.handler = serverless(app);