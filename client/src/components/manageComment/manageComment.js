import React, { useState, useEffect } from 'react'
import fetchReviewGraphQL from '../../modules/fetchReviewGraphQL'

import { getReviewComments, addToComment } from '../../queries/reviewQueries'
import EachComment from '../displayPost/eachComment'


const ManageComment = () => {
    const [comments, setComments] = useState()
    useEffect(() => {

        (async function getData() {
            const query = getReviewComments()
            const data = await fetchReviewGraphQL(query)
            const dataReview = data.data.reviewComments
            setComments(dataReview)
        })()



    }, [])

    const addComment = async (e) => {
        const element = document.createElement('span')
        element.innerHTML ='Added'
        element.setAttribute('id', 'add-review-post')
        e.target.parentNode.replaceChild(element, e.target)
        const id  = e.target.dataset.id
        const query = addToComment(id)
        await fetchReviewGraphQL(query)

    }

    return (
        <div className='wrapper'>
            <h3>Review Comments</h3>
            {comments && comments.map((c, i) => (
                <div key={i}>
                    <button data-id={c.id} onClick={addComment} id='add-review-post' className='button'>Add</button>
                    <EachComment key={i} first={c.author.first} last={c.author.first} date={c.date} content={c.content}></EachComment >
                </div>
            ))}
        </div>
    )

}

export default ManageComment