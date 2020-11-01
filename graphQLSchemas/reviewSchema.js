const {  PostType} = require('../graphQLTypes/types')
const ReviewPost = require('../models/ReviewPost')
const Post = require('../models/Post')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');


const ReviewQuery =  new GraphQLObjectType({
    name:'ReviewQueryType',
    fields:{
      reviewPosts:{
          type: new GraphQLList(PostType),
          resolve(parent){
              return ReviewPost.find({})
          }
      }
    }
})



const ReviewMutation = new GraphQLObjectType({
    name:'ReviewMutation',
    fields:{
        
        addToPost:{
          type:PostType,
            args:{
              id:{type: new GraphQLNonNull(GraphQLString)}
            },
           async resolve (parent,args){
              const {authorId, title, content} = await ReviewPost.findById(args.id)
              await ReviewPost.deleteOne({_id:args.id})
              
              return Post.create({authorId,title,content})
            }
        }
    }
})

let reviewSchema = new GraphQLSchema({
    query:ReviewQuery,
    mutation:ReviewMutation
})

module.exports = reviewSchema