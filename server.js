const express = require('express')
const app = express()
const apiRoute = require('./routes/api')
const authRoutes = require('./routes/authRoutes')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const graphQLSchema = require('./graphQLSchemas/schema')
const  bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema:graphQLSchema,
  graphiql:true
}))

app.use(apiRoute)
app.use(authRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, client,build,'./public/index.html'))
    })
}

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
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{ console.log('connected to DB')})
  .catch((err) => console.log(err));

const port = process.env.PORT
app.listen(port, ()=>{
    console.log('serving port ' + process.env.PORT );
})