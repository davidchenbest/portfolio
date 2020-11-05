const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const Post = require('../models/Post')
const Author = require('../models/Author')
const Comment = require('../models/Comment')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        first: { type: GraphQLString },
        last: { type: GraphQLString },
        email: { type: GraphQLString },
        date: { type: GraphQLString },
        post: {
            type: new GraphQLList(PostType),
            resolve(parent) {
                return Post.find({ authorId: parent.id })
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent) {
                return Author.findById(parent.authorId)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment.find({ postId: parent.id }).sort('-date')
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        postId: { type: GraphQLID },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent) {
                return Author.findById(parent.authorId)
            }
        }
    })
})

module.exports = { AuthorType, PostType, CommentType }