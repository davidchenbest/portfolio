function emailQuery(email) {
  return `{
        author(email:"${email}") {
          id
        }
      }`
}

function addAuthor(email, first, last) {
  return `
    mutation{
        addAuthor(email:"${email}",first:"${first}",last:"${last}"){
          id
        }
      }`
}

function addReviewPost(authorId, title, content) {
  return `mutation{
    addReviewPost(authorId:"${authorId}",title:"${title}",content:"""${content}"""){
      title      
    }
  }`
}

function postsQuery(){
  return `
  {
    posts{
      date
      title
      content
      author{
        first
        last
      }
      comments{
        date
        content
        author{
          first
          last
        }
      }
    }
  }
   `
}

module.exports = { emailQuery, addAuthor, addReviewPost, postsQuery }