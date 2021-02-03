function galleryFolders() {
  return `
    {
        folders{
          title
          description
          id
          date
          photos{
            id
            photoLink
            description
            date
          }
        }
      }
    `
}

function addPhoto(folderId, photoLink, description) {
  if (description === null || description === undefined) description = ''
  return `
  mutation{
    addPhoto(folderid:"${folderId}",photoLink:"${photoLink}",description:"${description}"){
      photoLink
    }
  }
  `
}

module.exports = { galleryFolders, addPhoto }