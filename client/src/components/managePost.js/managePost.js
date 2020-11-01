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
        const id  = e.target.dataset.id
        const query = addToPost(id)
        const data = await fetchReviewGraphQL(query)
        // console.log(data);
    }
    return (
        <>
            {posts && posts.map((p, index) => (
                <div key={index} >
                    <button data-id={p.id} onClick={addPost} >add</button>
                    <EachPost email={p.author.email} title={p.title} content={p.content} first={p.author.first} last={p.author.last} date={secToDate(p.date)} comments={[]}></EachPost>
                </div>
            ))}
        </>
    )

}

export default ManagePost