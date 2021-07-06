const { ApolloServer, gql } = require('apollo-server-express')
const typeDefs = gql`
    type Auth{
        error:String
        path: String
    }

    type Note{
        title:String
        content:String
    }

    type Query {
        notes:[Note]
        sign_in(username:String!, password:String!):Auth
      }
    type Mutation{
        addNote(title:String!, content:String!):Note
    }
    
 
`;

module.exports = typeDefs