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


  const AuthorType = new GraphQLObjectType({
      name:'Author',
      fields:()=>({
        id:{type:GraphQLID},
        first:{type:GraphQLString},
        last:{type:GraphQLString},
        email:{type:GraphQLString},
        date:{type:GraphQLString},
        post:{
            type: new GraphQLList(PostType),
            resolve(parent){
                return Post.find({authorId:parent.id})
            }
        }
      })
  })

  const PostType = new GraphQLObjectType({
      name:'Post',
      fields:()=>({
          id:{type:GraphQLID},
          title:{type:GraphQLString},
          content:{type:GraphQLString},
          date:{type:GraphQLString},
          author:{
              type: AuthorType,
              resolve(parent){
                return Author.findById(parent.authorId)
              }
            },
          comments:{
              type:new GraphQLList(CommentType),
              resolve(parent,args){
                  return Comment.find({postId:parent.id})
              }
          }
      })
  })

  const CommentType = new GraphQLObjectType({
      name:'Comment',
      fields:()=>({
        id:{type:GraphQLID},
        content:{type:GraphQLString},
        postID:{type:GraphQLID},
        date:{type:GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent){
                return Author.findById(parent.authorId)
            }
        }
      })
  })

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
          },
          reviewPosts:{
            type: new GraphQLList(PostType),
            resolve(parent){
                return ReviewPost.find({})
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