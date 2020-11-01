import React from 'react'
import CommentContainer from './commentContainer'
import cap from '../../modules/capitalizeFirstLetter'

const EachPost = ({ title, content, first, last, date, comments, email }) => {
    return (
        <div className='eachPost maxWidth'>
            <div id='each-post-title-con'>
                <span id='each-post-title'>{title}</span>
            </div>
            <div id='each-post-name-con'>
                <i className="material-icons">&#xe7ff;</i>
                <span>{cap(first)} {cap(last)} {email}</span>
                <p className='date'>{date}</p>
            </div>
            <div id='each-post-content-con'>
                <p>{content}</p>
            </div>

            {(comments.length >0) &&
            <CommentContainer comments={comments}></CommentContainer>
            }

        </div>
    )

}

export default EachPost