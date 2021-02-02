const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    photoLink:{
        type:String,
        required:[true,'Please provide photo link']
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
})

const folderSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required: [true, 'Please provide folder title']
    },
    description:{
        type:String,
    },
    photos:{
        type:[photoSchema]
    },
    date:{
        type:Date,
        default:Date.now
    },
})


const PhotoFolder = mongoose.model('photoFolder',folderSchema)
const Photo = mongoose.model('photo',photoSchema)
module.exports = {PhotoFolder,Photo}