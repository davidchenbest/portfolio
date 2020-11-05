import React from 'react'
import CommentContainer from './commentContainer'
import AddComment from './addComment'
import cap from '../../modules/capitalizeFirstLetter'

const EachPost = ({id,title, content, first, last, date, comments, email }) => {
    
    console.log(content);
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
                <p className='preserveBreak'>{content}</p>
            </div>
            <AddComment id={id}></AddComment>
            {(comments.length >0) &&
            <CommentContainer comments={comments}></CommentContainer>
            }
            
        </div>
    )

}

export default EachPost