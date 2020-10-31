const express = require('express')
const app = express()
const apiRoute = require('./routes/api')
const authRoutes = require('./routes/authRoutes')
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





//https://github.com/Automattic/mongoose/issues/8811   https://github.com/Automattic/mongoose/issues/8832
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{ console.log('connected to DB')})
  .catch((err) => console.log(err));

const port = process.env.PORT
app.listen(port, ()=>{
    console.log('serving port ' + process.env.PORT );
})