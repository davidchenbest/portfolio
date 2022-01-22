const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const scoresRoute = require('./routes/scores')
app.use('/functions/server', router);  // path must route to lambda

router.use('/scores', scoresRoute)


module.exports = app;
module.exports.handler = serverless(app);