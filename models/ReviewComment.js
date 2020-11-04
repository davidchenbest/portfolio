const mongoose = require('mongoose')

const reviewCommentSchema = new mongoose.Schema({
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

const ReviewComment = mongoose.model('reviewComment',reviewCommentSchema)
module.exports = ReviewComment