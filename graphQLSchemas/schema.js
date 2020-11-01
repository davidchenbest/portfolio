const Post = require('../models/Post')
const Author = require('../models/Author')
const Comment = require('../models/Comment')
const ReviewPost = require('../models/ReviewPost')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');


const { AuthorType, PostType, CommentType } = require('../graphQLTypes/types')

  const RootQuery = new GraphQLObjectType({
      name:'RootQueryType',
      fields:{
          post:{
              type : PostType,
              args : {id:{type:GraphQLString}},
              resolve(parent,args){
                  return Post.findById(args.id)
              }
          },
          posts:{
              type: new GraphQLList(PostType),
              resolve(){
                  return Post.find({})
              }
          },
          comment:{
            type : CommentType,
            args : {id:{type:GraphQLString}},
            resolve(parent,args){
                return Comment.findById(args.id)
            }
          },
          comments:{
            type : new GraphQLList(CommentType),
            resolve(){
                return Comment.find({})
            }
          },
          author:{
            type : new GraphQLList(AuthorType),
            args : {
                id:{type:GraphQLString},
                email:{type:GraphQLString}
            },
            async resolve(parent,args){
                if(args.email) return Author.find({email:args.email})
                return [Author.findById(args.id)]
            }
          },
          authors:{
              type: new GraphQLList(AuthorType),
              resolve(parent){
                  return Author.find({})
              }
          }
          
      }
  })

  

  const Mutation = new GraphQLObjectType({
      name:'Mutation',
      fields:{
          addAuthor:{
              type:AuthorType,
              args:{
                  first:{ type: new GraphQLNonNull(GraphQLString) },
                  last:{ type: new GraphQLNonNull(GraphQLString) },
                  email:{ type: new GraphQLNonNull(GraphQLString) }
              },
              resolve(parent,args){
                  let author = new Author({
                      email:args.email,
                      first:args.first,
                      last:args.last,
                  })
                  return author.save()
              }
          },
          addReviewPost:{
            type:PostType,
              args:{
                authorId:{type: new GraphQLNonNull(GraphQLString)},
                title:{type: new GraphQLNonNull(GraphQLString)},
                content:{type: new GraphQLNonNull(GraphQLString)},
              },
              resolve(parent,args){
                let reviewPost =  new ReviewPost({
                    authorId:args.authorId,
                    title:args.title,
                    content:args.content
                })
                return reviewPost.save()
              }
          }
      }
  })

  let graphQLSchema = new GraphQLSchema({
      query:RootQuery,
      mutation:Mutation
  })


  module.exports = graphQLSchema