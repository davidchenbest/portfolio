const mongoose = require('mongoose')
const { isEmail } = require('validator');

const authorSchema = new mongoose.Schema({
    first:{
        type:String,
        lowercase: true,
        required: [true, 'Please enter first name']
    },
    last:{
        type:String,
        lowercase: true,
        required: [true, 'Please enter last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    date:{
        type: Date,
        default: Date.now
    }

})

const Author = mongoose.model('author',authorSchema)
module.exports = Author

