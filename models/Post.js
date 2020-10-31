const mongoose = require('mongoose')
const { isEmail } = require('validator');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please enter Title']
    },
    content:{
        type:String,
        required: [true, 'Please add Content']
    },
    authorId:{
        type:String,
        required: [true, 'Please add email']
    },
    
    date:{
        type: Date,
        default: Date.now
    }

})

const Post = mongoose.model('post',postSchema)
module.exports = Post