function getReviewPosts(){
    return `{
        reviewPosts{
          id
          title
          content
          date
          author{
            first
            last
            email
          }
          
        }
      }`
}

function addToPost(id){
  return `
  mutation{
    addToPost(id:"${id}"){
      id
    }
  }
  `
}

module.exports = {getReviewPosts, addToPost}