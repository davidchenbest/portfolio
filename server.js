const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes')
const graphQLRoutes = require('./routes/graphQLRoutes')


app.use(graphQLRoutes)
app.use(authRoutes)
app.use(cors())



const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://jiachen.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

//https://github.com/Automattic/mongoose/issues/8811   https://github.com/Automattic/mongoose/issues/8832
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => { console.log('connected to DB') })
  .catch((err) => console.log(err));

const port = process.env.PORT
app.listen(port, () => {
  console.log('serving port ' + process.env.PORT);

})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  })
}