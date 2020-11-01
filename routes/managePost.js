const express = require('express');
const router = express.Router()
const ReviewPost = require( '../models/ReviewPost')

router.post('/manage', async(req,res)=>{
    let reviewPost = await ReviewPost.find({})
    res.json(reviewPost)

})

module.exports = router