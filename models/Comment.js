const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please enter Title']
    },
    content:{
        type:String,
        required: [true, 'Please add Content']
    },
    postId:{
        type:String,
        required: [true, 'Require Post ID']
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

const Comment = mongoose.model('comment',commentSchema)
module.exports = Comment