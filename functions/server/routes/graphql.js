const { ApolloServer } = require('apollo-server-express');
const resolvers = require('../graphql/resolvers')
const typeDefs = require('../graphql/typeDefs')
const { graphqlAuth } = require('../middlewares/auth')



const graphqlServer = new ApolloServer({
    typeDefs, resolvers, playground: false, context: (param) => {
        const { req, res } = param
        const result = graphqlAuth(req)
        if (result) req.user = true
        return param
    }
});



module.exports = graphqlServer

