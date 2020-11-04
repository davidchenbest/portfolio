import React, { useState, useEffect } from 'react'
import fetchReviewGraphQL from '../../modules/fetchReviewGraphQL'
import secToDate from '../../modules/secToDate'
import EachPost from '../../components/displayPost/eachPost'
const {getReviewPosts, addToPost} = require( '../../queries/reviewQueries')

const ManagePost = () => {
    const [posts, setPosts] = useState()
    useEffect(() => {

        (async function getData() {
            const query = getReviewPosts()
            const data = await fetchReviewGraphQL(query)
            const dataReview = data.data.reviewPosts
            setPosts(dataReview)
            console.log(dataReview);


        })()



    }, [])

    const addPost = async (e)=>{
        const element = document.createElement('span')
        element.innerHTML ='Added'
        element.setAttribute('id', 'add-review-post')
        e.target.parentNode.replaceChild(element, e.target)
        const id  = e.target.dataset.id
        const query = addToPost(id)
        await fetchReviewGraphQL(query)
        
    }
    return (
        <div className='wrapper'>
            <h3>Review Posts</h3>
            {posts && posts.map((p, index) => (
                <div key={index} >
                    <button data-id={p.id} onClick={addPost} id='add-review-post' className='button'>Add</button>
                    <EachPost email={p.author.email} title={p.title} content={p.content} first={p.author.first} last={p.author.last} date={secToDate(p.date)} comments={[]}></EachPost>
                </div>
            ))}
        </div>
    )

}

export default ManagePost