const express = require('express');
const router = express.Router()
const Post = require('../models/Post')
const Author = require('../models/Author')
const Comment = require('../models/Comment')


function handleErrors(err) {
    let { title, content, first, last, email } = err.errors
    let error = { problems: {} }
    if (title) {
        error.problems.title = title.message
    }
    if (content) {
        error.problems.content = content.message
    }
    if (first) {
        error.problems.first = first.message
    }
    if (last) {
        error.problems.last = last.message
    }
    if (email) {
        error.problems.email = email.message
    }
    return error
}


router.get('/api', (req, res) => {
    res.json({ data: 'hey' })
})


router.post('/add', async (req, res) => {
    console.log(req.body);
    res.json(req.body)
    // let obj = {
    //     first: 'jia',
    //     last: 'chen',
    //     email: 'd@.com'
    // }
    // let postObj = {
    //     title:'first',
    //     content:'firstpost'
    // }
    // let author = await findAuthor(obj.email)
    // if(!author) author =  await addAuthor(obj)
    // if(author.errors) res.json( handleErrors(author))

    // postObj.authorId = author._id
    // const post = await addPost(postObj)
    // if(post.errors) res.json( handleErrors(post))
    // res.json(post)

})
router.get('/addComment', async (req, res) => {
    let obj = {
        first: 'jia',
        last: 'chen',
        email: 'c@d.com'
    }
    let commentObj = {
        title: 'first',
        content: 'firstpost',
        postId: '5f94cf460b2ccb06104bf01b'
    }
    let author = await findAuthor(obj.email)
    if (!author) author = await addAuthor(obj)
    if (author.errors) res.json(handleErrors(author))
    let parentPost = await findPost(commentObj.postId)
    if (!parentPost._id) res.json({ problems: 'no associated post' })

    commentObj.authorId = author._id
    const comment = await addComment(commentObj)
    if (comment.errors) res.json(handleErrors(comment))
    res.json(comment)

})

async function findAuthor(email) {
    const author = await Author.findOne({ email })
    return author
}
async function findPost(id) {
    try {
        const post = await Post.findById(id)
        return post
    }
    catch (err) {
        return err
    }
}

async function addAuthor(obj) {
    try {
        const author = await Author.create(obj)
        return author
    }
    catch (err) {
        return (err)
    }
}

async function addPost(obj) {
    try {
        const post = await Post.create(obj)
        return post
    }
    catch (err) {
        return (err)
    }
}

async function addComment(obj) {
    try {
        const comment = await Comment.create(obj)
        return comment
    }
    catch (err) {
        return (err)
    }
}


module.exports = router