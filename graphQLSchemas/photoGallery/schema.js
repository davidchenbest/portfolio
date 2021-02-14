const { PhotoFolder, Photo } = require('../../models/photoGallery/PhotoFolder')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const { FolderType, PhotoType } = require('../../graphQLTypes/photoGalleryTypes')

// IMPLEMENT AT PUBLIC SCHEMA
const GalleryQuery = new GraphQLObjectType({
  name: 'GalleryQueryType',
  fields: {
    folders: {
      type: new GraphQLList(FolderType),
      resolve() {
        return {}
      }
    }
  }
})

const GalleryMutation = new GraphQLObjectType({
  name: 'galleryMutation',
  fields: {
    addFolder: {
      type: FolderType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const { title, description } = args
        return PhotoFolder.create({ title, description })
      }
    },
    addPhoto: {
      type: PhotoType,
      args: {
        folderid: { type: new GraphQLNonNull(GraphQLID) },
        photoLink: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { folderid, photoLink, description } = args
        try {
          const photo = new Photo({ photoLink, description })
          const folder = await PhotoFolder.updateOne({ _id: folderid }, {
            $push:
              { photos: photo }
          })
          if (folder.nModified) return photo
          return { photoLink: 'photo folder not found' }
        } catch (error) {
          return { photoLink: 'There was an error' }
        }
      }
    },
    editPhoto: {
      type: PhotoType,
      args: {
        folderid: { type: new GraphQLNonNull(GraphQLID) },
        photoid: { type: new GraphQLNonNull(GraphQLID) },
        photoLink: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { folderid, photoid, photoLink, description } = args
        try {
          const folder = await PhotoFolder.findOne({ _id: folderid })
          const index = folder.photos.findIndex(photo => photo.id === photoid)
          folder.photos[index].photoLink = photoLink
          if (description) folder.photos[index].description = description
          await folder.save()
          return folder.photos[index]
        } catch (error) {
          return { photoLink: 'There was an error' }
        }

      }
    }
  }
})


let gallerySchema = new GraphQLSchema({
  query: GalleryQuery,
  mutation: GalleryMutation,
})

module.exports = gallerySchema