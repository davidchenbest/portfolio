function galleryFolders(){
    return`
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

module.exports= {galleryFolders}