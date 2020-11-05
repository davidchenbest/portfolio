const express = require('express')
const router = express.Router()
const jwtAuth = require('../middleware/authMiddleware')
const {graphqlHTTP} = require('express-graphql');
const graphQLSchema = require('../graphQLSchemas/schema')
const reviewSchema = require('../graphQLSchemas/reviewSchema')

router.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true
}))

router.use('/reviewGraphql', jwtAuth, graphqlHTTP({
    schema: reviewSchema,
    graphiql: true
}))

module.exports =  router