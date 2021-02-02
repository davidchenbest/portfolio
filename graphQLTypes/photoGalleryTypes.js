const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const PhotoType = new GraphQLObjectType({
    name:'Photo',
    fields:()=>({
        id: { type: GraphQLID },
        photoLink:{ type: GraphQLString },
        description:{ type: GraphQLString },
        date:{ type: GraphQLString },
    })
    
})

const FolderType = new GraphQLObjectType({
    name:'Folder',
    fields:()=>({
        id: { type: GraphQLID },
        title:{ type: GraphQLString },
        description:{ type: GraphQLString },
        date:{ type: GraphQLString },
        photos:{
        type: new GraphQLList(PhotoType),
        resolve(parent){
            return parent.photos
        }
    }
    })
    

})

module.exports = {FolderType,PhotoType}